import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryMappingService {

  constructor() { }

  mapCategory(category: ICategory) {
    if(category == null) {
      return category;
    }
    else {
      return {
        key: category.key,
        name: category.name,
        kh_name: category.kh_name
      }
    }
  }
}
