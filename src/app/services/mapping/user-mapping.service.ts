import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class UserMappingService {

  constructor() { }

  mapUser(user: any) {
    if(user == null) {
      return user;
    }
    else {
      return {
        key: user.key,
        displayName: user.displayName,
        email: user.email,
        role: user.role
      }
    }
  }
}

export function pushToObject(doc: firebase.firestore.DocumentSnapshot) {
  if (!doc.exists) return null;
  return { ...doc.data(), key: doc.id }
}