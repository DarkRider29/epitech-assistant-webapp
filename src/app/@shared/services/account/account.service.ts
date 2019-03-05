import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  ref = firebase.firestore().collection('users');

  constructor() {
  }

  getUser(id: string) {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        const data = doc.data();
        observer.next({
          key: doc.id,
          email: data.email,
          connected: data.email
        });
      });
    });
  }

  postUser(id: string, email: string) {
    return new Observable((observer) => {
      this.ref.doc(id).set({
        email: email,
        connected: true
      }).then((doc) => {
        observer.next({
          key: id,
        });
      });
    });
  }
}
