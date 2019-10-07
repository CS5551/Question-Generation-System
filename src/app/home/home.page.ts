import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    console.log(firebase.auth().currentUser.uid);
  }

}
