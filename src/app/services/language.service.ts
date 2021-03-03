import { Injectable } from '@angular/core';
import * as Categories from 'make-plural/pluralCategories';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //private static LANGUAGES: string[] = Object.keys(Categories).filter((cat) => cat !== '_in');
  private static LANGUAGES: string[] = [
    'de',
    'en',
    'es',
    'fr',
    'it',
    'ja',
    'ko',
    'nl',
    'pt',
    'ru'
  ];

  constructor() {}

  getLang() {
    return LanguageService.LANGUAGES;
  }
}
