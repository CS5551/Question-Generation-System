import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {QuestionService} from "../../services/question.service";
import { HttpClient } from '@angular/common/http';
import {ModalListPage} from "../../modal/modal-list/modal-list.page";
import {ModalGenerateListPage} from "../../modal/modal-generate-list/modal-generate-list.page";

@Component({
  selector: 'app-question-parse',
  templateUrl: './question-parse.page.html',
  styleUrls: ['./question-parse.page.scss'],
})
export class QuestionParsePage implements OnInit {

  validations_form: FormGroup;
  validation_messages = {
    subject: [
      {type: 'required', message: 'Subject is required'},
    ],
    text: [
      {type: 'required', message: 'Text is required'},
    ],
  };

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private questionService: QuestionService,
              private http: HttpClient,
              private modalController: ModalController,
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      text: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      subject: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  async presentAlert(title: string, value: string) {
    const alert = await this.alertController.create({
      header: title,
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  generateQuestions(value) {
    this.http.get(
      'https://question-generator-260900.appspot.com/generate',
      {params: {text: value.text}}
    ).subscribe(data=>{
      console.log(data)
      this.openGenerateModal(data, value.subject);
    })
  }

  async openGenerateModal(questions, subject) {
    const modal = await this.modalController.create({
      component: ModalGenerateListPage,
      componentProps: {
        paramQuestions: questions,
        paramSubject: subject,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        console.log(dataReturned.data.questions);
        for (let item of dataReturned.data.questions) {
          this.questionService.createQuestion(item)
          .then(res => {
            console.log(res);
          }, err => {
            console.log(err);
          });
        }
      }
    });

    return await modal.present();
  }
}
