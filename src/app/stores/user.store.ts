import { action, observable } from "mobx";
import { computed } from 'mobx-angular';
import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserMappingService } from "../services/mapping/user-mapping.service";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class UserStore {
  @observable public User = null;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private userMapping: UserMappingService
  ) { }

  @computed
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('SessionUser');
    return user != null ? true : false;
  }

  @action
  async getCurrentLoggedInUser() {
    this.auth.authState.subscribe((data) => {
      const { email, uid } = data;

      this.afs.collection('users').doc(uid).valueChanges().subscribe((data: any) => {
        this.User = this.userMapping.mapUser(data);
      });
    })
  }

  @action
  async getCurrentLoggedInUser_2(callback) {
    this.auth.authState.subscribe((data) => {
      if (data) {
        const { email, uid } = data;

        this.afs.collection('users').doc(uid).valueChanges().subscribe((data: any) => {
          this.User = this.userMapping.mapUser(data);
          callback(this.User)
        });
      } else {
        callback(undefined);
      }
    })
  }
}
