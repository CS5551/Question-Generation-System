import { Component, OnInit } from '@angular/core';
import {Question} from "../../services/question.service";
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.page.html',
  styleUrls: ['./modal-list.page.scss'],
})
export class ModalListPage implements OnInit {
  questions: Array<{question: Question, isChecked: boolean}> = [];
  selectAllChecked = false;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
  ) { }

  ngOnInit() {
    for (let item of this.navParams.data.paramQuestions) {
      this.questions.push({question: item, isChecked: false});
    }
  }

  async closeModalWithoutData() {
    await this.modalController.dismiss();
  }

  async closeModalWithData() {
    const returnQuestions = [];
    for (let item of this.questions) {
      if (item.isChecked) {
        returnQuestions.push(item.question);
      }
    }

    const data = {
      questions: returnQuestions,
    };
    await this.modalController.dismiss(data);
  }

  selectAll() {
    if (this.selectAllChecked) {
      this.questions.map(item => item.isChecked = true);
    } else {
      this.questions.map(item => item.isChecked = false);
    }
  }
}
