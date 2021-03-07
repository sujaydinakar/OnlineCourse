import { action, observable } from 'mobx';
import { computed } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn:'root'})
export class AuthStore {
  
  @observable public User: any;

  constructor(private auth: AngularFireAuth) { }

  @computed
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('SessionUser');
    return user != null ? true : false;
    
    // let uid = undefined;

    // if (user) {
    //   let result = JSON.parse(user);
    //   uid = result.uid;
    // }
    
    // return user != null && uid != 'qW5M2wbTWEPJfp8lOaF6fJEDHbp1' ? true : false;
  }

  @action
  async getCurrentLoggedInUser() {
    this.auth.authState.subscribe((data) => {
      this.User = data;
    });
  }

}