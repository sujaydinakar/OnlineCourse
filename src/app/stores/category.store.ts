import { observable } from "mobx";
import { Injectable } from "@angular/core";

import arr_category from '../data/categories_dummy';

@Injectable({providedIn:'root'})
export class CategoryStore {
  @observable public Categories = arr_category;
}
