import { Component, OnInit } from '@angular/core';
import { Subscription} from "rxjs";
import {Question, QuestionService} from "../services/question.service";
import {AlertController, ModalController} from "@ionic/angular";
import { saveAs } from 'file-saver';
import {ModalListPage} from "../modal/modal-list/modal-list.page";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private questionsSubscr: Subscription;
  questions = [];
  selectAllChecked = false;

  constructor(private questionService: QuestionService,
              private alertController: AlertController,
              private modalController: ModalController,
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

  async deleteQuestions(){
    const prompt = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to delete these questions?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            for (let item of this.questions) {
              if (item.isChecked) {
                this.questionService.deleteQuestion(item.question.id)
                .then(res => {
                  console.log(res);
                }, err => {
                  console.log(err);
                });
              }
            }
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

  exportQuestions() {
    const file = new Blob([JSON.stringify(this.questions)], {type : 'application/json'});
    saveAs(file, "questions.json");
  }

  importQuestions(event) {
    const file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = () => {
      const contents = fileReader.result;
      console.log(JSON.parse(contents.toString()));
      this.openImportModal(JSON.parse(contents.toString()));
    };

    fileReader.readAsText(file);
  }

  async openImportModal(questions) {
    const modal = await this.modalController.create({
      component: ModalListPage,
      componentProps: {
        paramQuestions: questions,
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

  selectAll() {
    if (this.selectAllChecked) {
      this.questions.map(item => item.isChecked = true);
    } else {
      this.questions.map(item => item.isChecked = false);
    }
  }
}
