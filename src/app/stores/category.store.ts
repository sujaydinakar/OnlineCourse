import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from "../models/category.model";
import { GenerateKeywordsService } from "../services/generator/generate-keywords.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({providedIn:'root'})
export class CategoryStore {
  @observable public Categories: Array<ICategory>;
  @observable public Category: ICategory;

  @observable data: any = [];
  @observable loading = false;
  public lastVisible: any = null;
  @observable public fetching: boolean = false;
  @observable public searchText = null;
  @observable public filter = null;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  @action
  getCategories() {
    this.afs.collection('categories', ref => ref.where('isDelete', '==', false)).valueChanges().subscribe((data: any) => {
      this.Categories = data
    })
  }

  @action
  addCategory(categoryData: ICategory) {
    const key = this.afs.createId();

    this.afs.collection('categories').doc(key).set({
      key,
      ...categoryData,
    });
  }

  @action
  updateCategory(category: ICategory) {
    this.afs.collection(`categories`).doc(category.key).update(category);
  }

  @action
  deleteCategory(category: ICategory) {
    // this.afs.collection(`categories`).doc(category.key).delete();

    this.afs.collection(`categories`).doc(category.key).update({
      ...category,
      isDelete: true
    });
  }

  @action
  deleteFileFromFirebase(imagePath) {
    this.storage.ref(imagePath).delete();
  }

  @action
  async fetchCategoryData(search: any, filter: any) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;

    const ref = this.lazyCategoryRef(this.lastVisible, search, filter);

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
  async fetchCategoryDataMore() {
    this.fetching = true;

    this.lazyCategoryRef(this.lastVisible, this.searchText, this.filter).get().subscribe(response => {
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

  lazyCategoryRef(lastVisible: any, search, filter) {
    return this.afs.collection<any>("categories", ref => {
      let condition = ref.where('isDelete', '==', false).limit(20);

      if (search) {
        const txt = GenerateKeywordsService.toCapitalize(search)
        condition = condition.where('keywords', 'array-contains', txt)
      }

      if (lastVisible) {
        condition = condition.startAfter(lastVisible)
      }
      
      return condition
    })
  }
}
