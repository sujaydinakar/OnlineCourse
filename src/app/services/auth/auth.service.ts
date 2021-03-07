import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import { AuthStore } from 'src/app/stores/auth.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private authStore: AuthStore,
    private firebaseAuth: AngularFireAuth
  ) { }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log('Success!', value);
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });    
  }

  signin(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      this.authStore.User = value;
      localStorage.setItem('SessionUser', JSON.stringify(value.user));
      this.router.navigate(['/student']);
    })
    .catch(err => {
      alert('Something went wrong:' + err.message)
    });
  }

  signout() {
    this.firebaseAuth.signOut().then(() => {
      this.authStore.User = undefined;
      localStorage.removeItem('SessionUser');
      this.router.navigate(['/admin/login']);
    });
  }

}
