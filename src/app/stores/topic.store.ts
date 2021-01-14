import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { GenerateKeywordsService } from "../services/generator/generate-keywords.service";
import { ITopic } from "../models/topic.model";
import { ISubCategory } from "../models/subCategory.model";
import { ICategory } from "../models/category.model";
import { CategoryMappingService } from "../services/mapping/category-mapping.service";

@Injectable({providedIn:'root'})
export class CourseTopicStore {
  @observable public Topics: Array<ITopic>;
  @observable public Topic: ITopic;
  @observable public ParentCategory: ICategory;
  @observable public ParentCategories: Array<ICategory>;
  @observable public ParentSubCategory: ISubCategory;
  @observable public ParentSubCategories: Array<ISubCategory>;

  @observable data: any = [];
  @observable loading = false;
  public lastVisible: any = null;
  @observable public fetching: boolean = false;
  @observable public searchText = null;
  @observable public filter = null;

  constructor(
    private afs: AngularFirestore,
    private categoryMapping: CategoryMappingService,
  ) {}

  @action
  getParentCategory(parentKey: string) {
    this.afs.collection('categories').doc(parentKey).valueChanges().subscribe((data: any) => {
      this.ParentCategory = data;
    })
  }

  @action
  getParentSubCategory(parentKey: string, parentKey1: string) {
    this.afs.collection('subcategories').doc(parentKey1).valueChanges().subscribe((data: any) => {
      this.ParentSubCategory = data;
    })
  }

  @action
  getParentCategories() {
    this.afs.collection('categories').valueChanges().subscribe((data: any) => {
      this.ParentCategories = data;
    })
  }

  @action
  getParentSubCategoriesByParentCategoryKey(parentKey: string) {
    this.afs.collection('subcategories', ref => ref.where('categoryKey', '==', parentKey)).valueChanges().subscribe((data: any) => {
      this.ParentSubCategories = data;
    })
  }

  @action
  getTopics(parentKey: string, parentKey1: string) {
    this.afs.collection('topics', ref => ref.where('categoryKey', '==', parentKey).where('subCategoryKey', '==', parentKey1)).valueChanges().subscribe((data: any) => {
      this.Topics = data
    })
  }

  @action
  getTopics_2() {
    this.afs.collection('topics').valueChanges().subscribe((data: any) => {
      this.Topics = data
    })
  }

  @action
  addTopic(topicData: ITopic) {
    const key = this.afs.createId();
    let category = this.categoryMapping.mapCategory(this.ParentCategory);
    let subcategory = this.categoryMapping.mapCategory(this.ParentSubCategory);
    
    this.afs.collection('topics').doc(key).set({
      key,
      ...topicData,
      categoryKey: category.key,
      categoryRef: this.afs.collection('categories').doc(category.key).ref,
      subcategoryKey: subcategory.key,
      subcategoryRef: this.afs.collection('subcategories').doc(subcategory.key).ref,
    });
  }

  @action
  updateTopic(topicData: ITopic) {    
    this.afs.collection('topics').doc(topicData.key).update({
      ...topicData,
    });
  }

  @action
  deleteTopic(topicData: ITopic) {
    // this.afs.collection(`categories`).doc(this.ParentCategory.key).collection('subcategories').doc(this.ParentSubCategory.key)
    // .collection('topics').doc(topicData.key).delete();

    this.afs.collection('topics').doc(topicData.key).update({
      ...topicData,
      isDelete: true
    });
  }

  @action
  async fetchTopicData(search: any, filter: any, parentCategoryKey, parentSubCategoryKey) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;

    const ref = this.lazyTopicRef(this.lastVisible, search, filter, parentCategoryKey, parentSubCategoryKey);

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
  async fetchTopicDataMore(category_key, subcategory_key) {
    this.fetching = true;

    this.lazyTopicRef(this.lastVisible, this.searchText, this.filter, category_key, subcategory_key).get().subscribe(response => {
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

  lazyTopicRef(lastVisible: any, search, filter, category_key, subcategory_key) {
    return this.afs.collection<any>("topics", ref => {
      let condition = ref.where('isDelete', '==', false).where('categoryKey', '==', category_key).where('subcategoryKey', '==', subcategory_key).limit(20);

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
