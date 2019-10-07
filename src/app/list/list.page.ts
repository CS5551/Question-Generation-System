import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public items: Array<{ question: string; type: string, difficulty: any, subject: string }> = [];
  private questionsSubscr: Subscription;

  constructor(private questionService: QuestionService) {


  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Home will enter');
    this.questionsSubscr = this.questionService.getQuestions().subscribe(res => {
      if (res.length !== 0) {
        for (let i = 0; i < res.length; i++) {
          this.items.push({
            question: res[i].question,
            type: res[i].type,
            difficulty: res[i].difficulty,
            subject: res[i].subject,
          });
        }
      }
    });
  }

  ionViewWillLeave() {
    this.questionsSubscr.unsubscribe();
  }
}
