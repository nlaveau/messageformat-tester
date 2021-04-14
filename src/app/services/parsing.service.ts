import { Injectable } from '@angular/core';
import { parse } from 'messageformat-parser';
import * as PluralCategories from 'make-plural/pluralCategories';

import {
  Token,
  Select,
  SelectCase,
  Plural,
  PluralCase,
  Argument,
  Octothorpe
} from '../models/messageformat-tokens';

type MFTokenType =
  | 'punctuation'
  | 'pluralcase'
  | 'selectcase'
  | 'octothorpe'
  | 'keyword'
  | 'variable'
  | 'text'
  | 'error';

interface MFToken {
  type: MFTokenType;
  value: string;
}

const OPEN_BRACKET: MFToken = { type: 'punctuation', value: '{' };
const CLOSE_BRACKET: MFToken = { type: 'punctuation', value: '}' };
const COMMA: MFToken = { type: 'punctuation', value: ',' };

export interface MFTokenizationResult {
  tokens: MFToken[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParsingService {
  constructor() {}

  private getLocale(lang: string) {
    return {
      cardinal: PluralCategories[lang].cardinal,
      ordinal: PluralCategories[lang].ordinal,
      strict: true
    };
  }

  private unparseToken(token: Token | Token[]): MFToken[] {
    if (Array.isArray(token)) {
      return token.flatMap(t => this.unparseToken(t));
    }
    if (typeof token === 'string') {
      return [{ type: 'text', value: token }];
    }
    switch (token.type) {
      case 'argument':
        return this.unparseArgument(token);
      case 'plural':
      case 'selectordinal':
        return this.unparsePlural(token);
      case 'select':
        return this.unparseSelect(token);
      case 'octothorpe':
        return this.unparseOctothorpe(token);
    }
  }

  private unparseArgument(token: Argument): MFToken[] {
    return [
      OPEN_BRACKET,
      { type: 'variable', value: token.arg },
      CLOSE_BRACKET
    ];
  }

  private unparsePluralCase(token: PluralCase): MFToken[] {
    const fixedKey = ['zero', 'one', 'two', 'few', 'many', 'other'].includes(
      token.key
    )
      ? token.key
      : `=${token.key}`;
    const a: MFToken[] = [
      { type: 'pluralcase', value: fixedKey },
      OPEN_BRACKET
    ];
    const b = token.tokens.flatMap(tk => this.unparseToken(tk));
    return a.concat(b).concat([CLOSE_BRACKET]);
  }

  private unparseSelectCase(token: SelectCase): MFToken[] {
    const a: MFToken[] = [
      { type: 'selectcase', value: token.key },
      OPEN_BRACKET
    ];
    const b = token.tokens.flatMap(tk => this.unparseToken(tk));
    return a.concat(b).concat([CLOSE_BRACKET]);
  }

  private unparsePlural(token: Plural): MFToken[] {
    const a: MFToken[] = [
      OPEN_BRACKET,
      { type: 'variable', value: token.arg },
      COMMA,
      { type: 'keyword', value: token.type },
      COMMA
    ];
    const b: MFToken[] = token.cases.flatMap(aCase =>
      this.unparsePluralCase(aCase)
    );
    return a.concat(b).concat([CLOSE_BRACKET]);
  }

  private unparseSelect(token: Select): MFToken[] {
    const a: MFToken[] = [
      OPEN_BRACKET,
      { type: 'variable', value: token.arg },
      COMMA,
      { type: 'keyword', value: token.type },
      COMMA
    ];
    const b: MFToken[] = token.cases.flatMap(aCase =>
      this.unparseSelectCase(aCase)
    );
    const c: MFToken[] = [CLOSE_BRACKET];
    return a.concat(b).concat(c);
  }

  private unparseOctothorpe(token: Octothorpe): MFToken[] {
    return [{ type: 'octothorpe', value: '#' }];
  }

  private rematchTokens(message: string, tokens: MFToken[]): MFToken[] {
    const result = [];
    let m = message;
    tokens.forEach(token => {
      const index = m.indexOf(token.value);
      const cutPoint = index + token.value.length;
      result.push({
        ...token,
        value: m.slice(0, cutPoint)
      });
      m = m.slice(cutPoint);
    });
    return result;
  }

  tokenize(message: string, lang: string): MFTokenizationResult {
    try {
      const parsedArray: Token | Token[] = parse(message, this.getLocale(lang));
      const tokens = this.unparseToken(parsedArray);
      const ftokens = this.rematchTokens(message, tokens);
      return { tokens: ftokens };
    } catch (parsingError) {
      let tokens: MFToken[];
      let error;
      if (parsingError.location) {
        const start = parsingError.location.start.offset;
        const end = parsingError.location.end.offset;
        tokens = [
          { type: 'text', value: message.slice(0, start) },
          { type: 'error', value: message.slice(start, end) },
          { type: 'text', value: message.slice(end) }
        ];
        error = parsingError.message;
      } else {
        tokens = [{ type: 'text', value: message }];
        error = parsingError.toString();
      }
      return { tokens, error };
    }
  }
}
