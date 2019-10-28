import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import {map} from "rxjs/operators";
import {Question} from "./question.service";

export interface Paper {
  id?: string;
  questions: Array<string>;
  title: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  constructor(private db: AngularFirestore,

  ) { }

  createPaper(value) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      const usersCollection = this.db.collection('users');
      const papersCollection = usersCollection.doc(currentUser.uid).collection<Paper>('papers');

      papersCollection
      .add({
        title: value.title,
        questions: value.questions,
        difficulty: value.difficulty,
      })
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  getPapers() {
    const currentUser = firebase.auth().currentUser;
    const usersCollection = this.db.collection('users');
    const papersCollection = usersCollection.doc(currentUser.uid).collection<Paper>('papers');

    return papersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Paper;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  deletePaper(paperId) {
    const currentUser = firebase.auth().currentUser;
    const usersCollection = this.db.collection('users');
    const papersCollection = usersCollection.doc(currentUser.uid).collection<Paper>('papers');

    return new Promise<any>((resolve, reject) => {
      papersCollection.doc(paperId).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }
}
