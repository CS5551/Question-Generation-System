import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

export interface Question {
  id?: string;
  question: string;
  type: string;
  difficulty: any;
  subject: string;
  choices: Array<any>;
  isChecked?: boolean;
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
          choices: value.type === 'Choice' ? value.choices : [],
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

  getQuestion(id: string) {
    const currentUser = firebase.auth().currentUser;
    const usersCollection = this.db.collection('users');
    const questionsCollection = usersCollection.doc(currentUser.uid).collection<Question>('questions');

    return questionsCollection.doc<Question>(id).valueChanges();
  }

  getQuestionsOnPaper(ids: string[]) {
    const list: Array<Question> = [];
    if (ids) {
      for (let item of ids) {
        this.getQuestion(item).subscribe(res => {
          res.id = item;
          list.push(res);
        });
      }
    }
    return list;
  }

  updateQuestion(value, questionId: string) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      const usersCollection = this.db.collection('users');
      const questionsCollection = usersCollection.doc(currentUser.uid).collection<Question>('questions');


      questionsCollection.doc(questionId)
      .update({
        question: value.question,
        type: value.type,
        difficulty: value.difficulty,
        subject: value.subject,
        choices: value.type === 'Choice' ? value.choices : [],
      })
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  deleteQuestion(questionId) {
    const currentUser = firebase.auth().currentUser;
    const usersCollection = this.db.collection('users');
    const questionsCollection = usersCollection.doc(currentUser.uid).collection<Question>('questions');

    return new Promise<any>((resolve, reject) => {
      questionsCollection.doc(questionId).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }
}
