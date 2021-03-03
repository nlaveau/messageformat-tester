import { Injectable } from '@angular/core';
import { FileInfo } from '../models/file-info';
import { parse } from 'messageformat-parser';
import * as PluralCategories from 'make-plural/pluralCategories';
import { FileParseError } from '../models/file-parse-error';

@Injectable({
  providedIn: 'root'
})
export class FileParsingService {
  parseFile(fileInfo: FileInfo): FileParseError[] {
    const errors = [];
    const messageMap = this.parseFileToKeyValueMap(fileInfo);
    const locale = this.getLocale(fileInfo.language);

    for (const [key, value] of messageMap) {
      this.parseMessage(key, value, locale, errors);
    }

    return errors;
  }

  private parseMessage(
    key: string,
    message: string,
    locale: any,
    errors: FileParseError[]
  ) {
    try {
      parse(message, locale);
    } catch (parsingError) {
      errors.push(new FileParseError(key, message, parsingError.message));
    }
  }

  private getLocale(lang: string) {
    return {
      cardinal: PluralCategories[lang].cardinal,
      ordinal: PluralCategories[lang].ordinal
    };
  }

  private parseFileToKeyValueMap(fileInfo: FileInfo): Map<string, string> {
    const result = new Map();
    this.getKeyValueMapFromObject(
      fileInfo.fileContent,
      '',
      result,
      fileInfo.allowList
    );
    return result;
  }

  private getKeyValueMapFromObject(
    obj: any,
    prefix: string,
    map: Map<string, string>,
    allowList: string[]
  ) {
    for (const key in obj) {
      if (Array.isArray(obj[key]) || typeof obj[key] === 'object') {
        const tmpKey = `${prefix}${key}.`;
        if (this.isAllowedKey(tmpKey, allowList)) {
          this.getKeyValueMapFromObject(obj[key], tmpKey, map, allowList);
        }
      } else {
        map.set(prefix + key, obj[key]);
      }
    }
  }

  private isAllowedKey(key: string, allowList: string[]) {
    for (const allowedKey of allowList) {
      if (key.startsWith(allowedKey)) {
        return true;
      }
    }
    return false;
  }
}
