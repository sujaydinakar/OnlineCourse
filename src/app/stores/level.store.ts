import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

import { GenerateKeywordsService } from "../services/generator/generate-keywords.service";
import { ILevel } from "../models/level.model";

@Injectable({providedIn:'root'})
export class CourseLevelStore {
  @observable public Levels: Array<ILevel>;
  @observable public Level: ILevel;

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
  getLevels() {
    this.afs.collection('levels', ref => ref.where('isDelete', '==', false)).valueChanges().subscribe((data: any) => {
      this.Levels = data
    })
  }

  @action
  addLevel(levelData: ILevel) {
    const key = this.afs.createId();

    this.afs.collection('levels').doc(key).set({
      key,
      ...levelData,
    });
  }

  @action
  updateLevel(levelData: ILevel) {
    this.afs.collection(`levels`).doc(levelData.key).update(levelData);
  }

  @action
  deleteLevel(levelData: ILevel) {
    // this.afs.collection(`levels`).doc(levelData.key).delete();

    this.afs.collection(`levels`).doc(levelData.key).update({
      ...levelData,
      isDelete: true
    });
  }

  @action
  async fetchLevelData(search: any, filter: any) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;

    const ref = this.lazyLevelRef(this.lastVisible, search, filter);

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
  async fetchLevelDataMore() {
    this.fetching = true;

    this.lazyLevelRef(this.lastVisible, this.searchText, this.filter).get().subscribe(response => {
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

  lazyLevelRef(lastVisible: any, search, filter) {
    return this.afs.collection<any>("levels", ref => {
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
