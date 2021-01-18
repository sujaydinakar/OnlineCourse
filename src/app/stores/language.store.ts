import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

import { GenerateKeywordsService } from "../services/generator/generate-keywords.service";
import { ILanguage } from "../models/language.model";

@Injectable({providedIn:'root'})
export class CourseLanguageStore {
  @observable public Languages: Array<ILanguage>;
  @observable public Language: ILanguage;

  @observable data: any = [];
  @observable loading = false;
  public lastVisible: any = null;
  @observable public fetching: boolean = false;
  @observable public searchText = null;
  @observable public filter = null;

  constructor(
    private afs: AngularFirestore,
  ) {}

  @action
  getLanguages() {
    this.afs.collection('languages', ref => ref.where('isDelete', '==', false)).valueChanges().subscribe((data: any) => {
      this.Languages = data
    })
  }

  @action
  addLanguage(languageData: ILanguage) {
    const key = this.afs.createId();

    this.afs.collection('languages').doc(key).set({
      key,
      ...languageData,
    });
  }

  @action
  updateLanguage(languageData: ILanguage) {
    this.afs.collection(`languages`).doc(languageData.key).update(languageData);
  }

  @action
  deleteLanguage(languageData: ILanguage) {
    // this.afs.collection(`languages`).doc(languageData.key).delete();

    this.afs.collection(`languages`).doc(languageData.key).update({
      ...languageData,
      isDelete: true
    });
  }

  @action
  async fetchLanguageData(search: any, filter: any) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;

    const ref = this.lazyLanguageRef(this.lastVisible, search, filter);

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
  async fetchLanguageDataMore() {
    this.fetching = true;

    this.lazyLanguageRef(this.lastVisible, this.searchText, this.filter).get().subscribe(response => {
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

  lazyLanguageRef(lastVisible: any, search, filter) {
    return this.afs.collection<any>("languages", ref => {
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
