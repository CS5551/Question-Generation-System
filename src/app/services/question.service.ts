import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Question {
  id?: string;
  question: string;
  type: string;
  difficulty: any;
  subject: string;
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private db: AngularFirestore
  ) {
  }

  createQuestion(value) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      const usersCollection = this.db.collection('users');
      const questionsCollection = usersCollection.doc(currentUser.uid).collection<Question>('questions');

      questionsCollection
          .add({
            question: value.question,
            type: value.type,
            difficulty: value.difficulty,
            subject: value.subject,
          })
          .then(
              res => resolve(res),
              err => reject(err)
          );
    });
  }

  getQuestions() {
    const currentUser = firebase.auth().currentUser;
    const usersCollection = this.db.collection('users');
    const questionsCollection = usersCollection.doc(currentUser.uid).collection<Question>('questions');

    return questionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Question;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }
}
