import { Component, OnInit } from '@angular/core';
import {Question} from "../../services/question.service";
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-modal-generate-list',
  templateUrl: './modal-generate-list.page.html',
  styleUrls: ['./modal-generate-list.page.scss'],
})
export class ModalGenerateListPage implements OnInit {

  questions: Array<{question: Question, isChecked: boolean}> = [];
  selectAllChecked = false;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
  ) { }

  ngOnInit() {
    for (let item of this.navParams.data.paramQuestions) {
      const question = {
        question: item,
        subject: this.navParams.data.paramSubject,
        type: 'Text',
        difficulty: 1,
        choices: [],
      };
      this.questions.push({question: question, isChecked: false});
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
