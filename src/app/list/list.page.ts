import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {QuestionService} from "../services/question.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private questionsSubscr: Subscription;
  questions = [];

  constructor(private questionService: QuestionService,
              private alertController: AlertController,
  ) {

  }

  ngOnInit() {
  }

  async presentAlert(title: string, value: string) {
    const alert = await this.alertController.create({
      header: title,
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.questionsSubscr = this.questionService.getQuestions().subscribe(res => {
      if (res.length !== 0) {
        this.questions = res;
      }
    });
  }

  ionViewWillLeave() {
    this.questionsSubscr.unsubscribe();
  }

  async deleteQuestion(question: any){
    const prompt = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to delete the question?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.questionService.deleteQuestion(question.id)
            .then(res => {
              this.presentAlert('Success', 'Question deleted');
            }, err => {
              this.presentAlert('Error', err.message);
            });
          }
        },
        {
          text: 'No',
          handler: data => {
          }
        }
      ]
    });
    await prompt.present();
  }
}
