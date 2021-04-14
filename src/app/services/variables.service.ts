import { Injectable } from '@angular/core';
import { parse } from 'messageformat-parser';
import { uniq, groupBy } from 'lodash';

import { Token } from '../models/messageformat-tokens';
import { BrowserStack } from 'protractor/built/driverProviders';

export interface MFVar {
  type: 'select' | 'number' | 'string' | 'datetime' | 'duration';
  name: string;
  values?: string[];
}

interface MFVarReport {
  message: string;
  name: string;
  values?: string;
}

export interface VariableComparisonResult {
  errors: MFVarReport[];
  warnings: MFVarReport[];
}

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  constructor() {}

  private extractVariableFromToken(token: Token | Token[]): MFVar[] {
    if (Array.isArray(token)) {
      return token.flatMap(t => this.extractVariableFromToken(t));
    }
    if (typeof token === 'string') {
      return [];
    }
    switch (token.type) {
      case 'argument':
        return [{ type: 'string', name: token.arg }];
      case 'plural':
      case 'selectordinal':
        const a: MFVar[] = [{ type: 'number', name: token.arg }];
        const b: MFVar[] = token.cases.flatMap(aCase =>
          this.extractVariableFromToken(aCase.tokens)
        );
        return a.concat(b);
      case 'select':
        const c: MFVar[] = [
          {
            type: 'select',
            name: token.arg,
            values: token.cases.map(aCase => aCase.key)
          }
        ];
        const d: MFVar[] = token.cases.flatMap(aCase =>
          this.extractVariableFromToken(aCase.tokens)
        );
        return c.concat(d);
      case 'octothorpe':
        return [];
      case 'function':
        switch (token.key) {
          case 'date':
          case 'time':
            return [{type: 'datetime', name: token.arg}];
          case 'duration':
            return [{type: 'duration', name: token.arg}];
          case 'number':
            return [{type: 'number', name: token.arg}];
        }
    }
  }

  private simplifyVariables(vars: MFVar[]): MFVar[] {
    const groups = groupBy(vars, aVar => aVar.name);
    return Object.values(groups).map(group => {
      if (group.some(aVar => aVar.type === 'select')) {
        return group
          .filter(aVar => aVar.type === 'select')
          .reduce((finalVar, aVar) => ({
            ...finalVar,
            values: uniq(finalVar.values.concat(aVar.values))
          }));
      }
      if (group.some(aVar => aVar.type === 'number')) {
        return group.find(aVar => aVar.type === 'number');
      }
      return group[0];
    });
  }

  public extractVariables(message: string): MFVar[] {
    try {
      const parsedArray: Token | Token[] = parse(message);
      const allVariables = this.extractVariableFromToken(parsedArray);
      return this.simplifyVariables(allVariables);
    } catch (e) {
      return [];
    }
  }

  public compareVariables(srcVars: MFVar[], dstVars: MFVar[]) {
    const notInDst = srcVars.filter(
      aVar => !dstVars.some(bVar => aVar.name === bVar.name)
    );
    const notInSrc = dstVars.filter(
      aVar => !srcVars.some(bVar => aVar.name === bVar.name)
    );
    const inBoth = srcVars.filter(
      aVar => !notInDst.some(bVar => aVar.name === bVar.name)
    );

    const result = {
      errors: [],
      warnings: []
    };

    notInDst.forEach(aVar => {
      result.warnings.push({
        message: 'present in source message, but not in translated message',
        name: aVar.name
      });
    });
    notInSrc.forEach(aVar => {
      result.errors.push({
        message: 'present in translated message, but not in source message',
        name: aVar.name
      });
    });
    inBoth.forEach(aVar => {
      const bVar = dstVars.find(cVar => cVar.name === aVar.name);
      switch (aVar.type + bVar.type) {
        case 'numberselect':
          result.warnings.push({
            message:
              'is a plural or selectordinal in source message, but is a select in translated message',
            name: aVar.name
          });
          break;
        case 'numberstring':
          result.warnings.push({
            message:
              'was used in a plural or selectordinal expression in source message, but is an insertion variable in translated message',
            name: aVar.name
          });
          break;
        case 'selectnumber':
          result.errors.push({
            message:
              'is used in a select in the source message, but is used in a plural or selectordinal expression in translated message',
            name: aVar.name
          });
          break;
        case 'selectstring':
          result.errors.push({
            message:
              'is used in a select in the source message, but is used directly as an insertion variable in translated message',
            name: aVar.name
          });
          break;
        case 'stringselect':
        case 'stringnumber':
          result.errors.push({
            message:
              'is a simple insertion variable in the source message, but is used with a plural/select/selectordinal case in translated message',
            name: aVar.name
          });
          break;
        case 'selectselect':
          const notInDstValues = aVar.values.filter(
            aValue => !bVar.values.some(bValue => aValue === bValue)
          );
          const notInSrcValues = bVar.values.filter(
            bValue => !aVar.values.some(aValue => aValue === bValue)
          );
          if (notInDstValues.length > 0) {
            result.warnings.push({
              message: `source message select allows for values [${notInDstValues.join(
                ', '
              )}] which are not considered in translated message. The 'other' case will be used.`,
              name: aVar.name
            });
          }
          if (notInSrcValues.length > 0) {
            result.errors.push({
              message: `translated message select uses values [${notInSrcValues.join(
                ', '
              )}] which are not used in the source message`,
              name: aVar.name
            });
          }
          break;
        case 'datetimenumber':
        case 'datetimeduration':
        case 'datetimestring':
          result.errors.push({
            message: 'is a date variable in the source message, but is not used like that in the destination message'
          });
          break;
        case 'durationdatetime':
        case 'durationnumber':
        case 'datestring':
          result.errors.push({
            message: 'is a duration variable in the source message, but is not used like that in the destination message'
          });
          break;
        case 'datetimenumber':
        case 'datetimeduration':
        case 'datetimestring':
          result.errors.push({
            message: 'is a time variable in the source message, but is not used like that in the destination message'
          });
          break;
        case 'numberdatetime':
        case 'numberduration':
          result.errors.push({
            message: 'is a number variable in the source message, but is not used in a incompatible way in the destination message'
          });
          break;
        case 'selectdatetime':
        case 'selectduration':
          result.errors.push({
            message: 'is a select variable in the source message, but is not used in a incompatible way in the destination message'
          });
          break;
        case 'stringdatetime':
        case 'stringduration':
          result.errors.push({
            message: 'is a string variable in the source message, but is not used in a incompatible way in the destination message'
          });
          break;
        case 'datetimedatetime':
        case 'durationduration':
        case 'numbernumber':
        case 'stringstring':
        default:
          break;
      }
    });
    return result;
  }
}
