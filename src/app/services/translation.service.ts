import { Injectable } from '@angular/core';
import * as MessageFormat from 'messageformat';
import { MessageVariables } from '../models/message-variables';

export interface TranslationResult {
  translation?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  public interpolate(message: string, language: string, variables: MessageVariables) {
    try {
      const messageFun = new MessageFormat(language).compile(message);
      const translation = messageFun(variables);
      return { translation };
    }
    catch (e) {
      const error = e.toString();
      return { error };
    }
  }
}
