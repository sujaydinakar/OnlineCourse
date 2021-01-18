import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { GenerateKeywordsService } from "../services/generator/generate-keywords.service";
import { ISubCategory } from "../models/subCategory.model";
import { ICategory } from "../models/category.model";
import { CategoryMappingService } from "../services/mapping/category-mapping.service";

@Injectable({providedIn:'root'})
export class SubCategoryStore {
  @observable public SubCategories: Array<ISubCategory>;
  @observable public SubCategory: ISubCategory;
  @observable public ParentCategory: ICategory;

  @observable data: any = [];
  @observable loading = false;
  public lastVisible: any = null;
  @observable public fetching: boolean = false;
  @observable public searchText = null;
  @observable public filter = null;

  constructor(
    private afs: AngularFirestore,
    private categoryMapping: CategoryMappingService
  ) {}

  @action
  getParentCategory(parentKey: string) {
    this.afs.collection('categories').doc(parentKey).valueChanges().subscribe((data: any) => {
      this.ParentCategory = data;
    })
  }

  @action
  getSubCategories(parentKey: string) {
    this.afs.collection('subcategories', ref => ref.where('category.key', '==', parentKey)).valueChanges().subscribe((data: any) => {
      this.SubCategories = data
    })
  }

  @action
  getSubCategories_2() {
    this.afs.collection('subcategories').valueChanges().subscribe((data: any) => {
      this.SubCategories = data
    })
  }

  @action
  addSubCategory(categoryData: ISubCategory) {
    const key = this.afs.createId();
    let category = this.categoryMapping.mapCategory(this.ParentCategory);
    
    this.afs.collection('subcategories').doc(key).set({
      key,
      ...categoryData,
      category: category,
    });
  }

  @action
  updateSubCategory(category: ISubCategory) {
    this.afs.collection('subcategories').doc(category.key).update(category);
  }

  @action
  deleteSubCategory(category: ISubCategory) {
    // this.afs.collection(`categories`).doc(this.ParentCategory.key).collection('subcategories').doc(category.key).delete();

    this.afs.collection(`subcategories`).doc(category.key).update({
      ...category, 
      isDelete: true
    });
  }

  @action
  async fetchSubCategoryData(search: any, filter: any, categoryKey) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;

    const ref = this.lazySubCategoryRef(this.lastVisible, search, filter, categoryKey);

    ref.auditTrail().subscribe();
    ref.snapshotChanges().subscribe(response => {
      this.data = [];

      if (!response.length) {
        this.loading = false;
        this.fetching = false;
        return false;
      }

      this.lastVisible = response[response.length - 1].payload.doc;

      for (let item of response) {
        this.data.push(item.payload.doc.data());
      }

      this.loading = false
      this.fetching = false;
    }, error => {
      this.loading = false;
    });
  }

  @action
  async fetchSubCategoryDataMore(parentKey) {
    this.fetching = true;

    this.lazySubCategoryRef(this.lastVisible, this.searchText, this.filter, parentKey).get().subscribe(response => {
      if (!response.docs.length) {
        this.loading = false
        this.fetching = false;
        return;
      }

      this.lastVisible = response.docs[response.docs.length - 1];

      for (let item of response.docs) {
        this.data.push(item.data());
      }

      this.fetching = false;
    }, error => {
      this.fetching = false;
    });
  }

  lazySubCategoryRef(lastVisible: any, search, filter, categoryKey) {
    return this.afs.collection<any>("subcategories", ref => {
      let condition = ref.where('isDelete', '==', false).where('category.key', '==', categoryKey).limit(20);

      if (search) {
        const txt = GenerateKeywordsService.toCapitalize(search)
        condition = condition.where('keywords', 'array-contains', txt)
      }

      if (lastVisible) {
        condition = condition.startAfter(lastVisible)
      }

      return condition;
    })
  }
}
