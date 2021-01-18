import { Injectable } from '@angular/core';
import { ILanguage } from 'src/app/models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageMappingService {

  constructor() { }

  mapLanguage(language: ILanguage) {
    if(language == null) {
      return language;
    }
    else {
      return {
        key: language.key,
        name: language.name,
        kh_name: language.kh_name
      }
    }
  }
}
