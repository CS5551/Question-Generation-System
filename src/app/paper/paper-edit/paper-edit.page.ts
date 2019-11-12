import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Question, QuestionService} from "../../services/question.service";
import {AlertController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {Paper, PaperService} from "../../services/paper.service";

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.page.html',
  styleUrls: ['./paper-edit.page.scss'],
})
export class PaperEditPage implements OnInit {

  private questionSubscr: Subscription;
  private paperSubscr: Subscription;
  questions: Array<Question> = [];
  paperId = null;
  paper: Paper = {
    questions: [],
    title: '',
    difficulty: '',
  };

  constructor(private questionService: QuestionService,
              private paperService: PaperService,
              private alertController: AlertController,
              private route: ActivatedRoute,
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
    this.paperId = this.route.snapshot.params['id'];
    if (this.paperId) {
      this.paperSubscr = this.paperService.getPaper(this.paperId).subscribe(res => {
        this.paper = res;
        this.questions = this.questionService.getQuestionsOnPaper(this.paper.questions);
      });
    }
  }

  ionViewWillLeave() {
    this.questionSubscr.unsubscribe();
    this.paperSubscr.unsubscribe();
  }

}
