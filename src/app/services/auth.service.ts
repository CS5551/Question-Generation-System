import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private db: AngularFirestore,
  ) {
  }

  register(info) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
          .then((newUserCredential: firebase.auth.UserCredential) => {
            this.db.doc(`users/${newUserCredential.user.uid}`).set({
              email: info.email,
              firstName: info.firstName,
              lastName: info.lastName,
            });
          })
          .then(
              res => resolve(res),
              err => reject(err));
    });
  }

  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
              res => resolve(res),
              err => reject(err));
    });
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}
