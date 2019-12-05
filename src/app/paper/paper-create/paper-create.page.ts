import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {PaperService} from "../../services/paper.service";
import {Subscription} from "rxjs";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-paper-create',
  templateUrl: './paper-create.page.html',
  styleUrls: ['./paper-create.page.scss'],
})
export class PaperCreatePage implements OnInit {
  difficulties: Array<any>;
  private questionsSubscr: Subscription;
  questions = [];
  validations_form: FormGroup;
  validation_messages = {
    title: [
      {type: 'required', message: 'Title is required'},
    ],
    numQuestions: [
      {type: 'required', message: 'Number of Questions is required'},
      {type: 'pattern', message: 'Only contain number'}
    ],
    difficulty: [
      {type: 'selectType', message: 'Please select difficulty'}
    ],
  };

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private paperService: PaperService,
              private navCtrl: NavController,
              private questionService: QuestionService,
              ) { }

  ngOnInit() {
    this.difficulties = [
      'Select one',
      'Easy',
      'Medium',
      'Hard',
    ];

    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      numQuestions: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*')
      ])),
      difficulty: new FormControl(this.difficulties[0], Validators.compose([
        Validators.required,
      ])),
    }, {
      validators: [
        selectType('difficulty')]
    });
  }

  ionViewWillEnter() {
    console.log("Sub")
    this.questionsSubscr = this.questionService.getQuestions().subscribe(res => {
      if (res.length !== 0) {
        this.questions = res;
      }
    });
  }

  ionViewWillLeave() {
    console.log("Unsub")
    this.questionsSubscr.unsubscribe();
  }

  async presentAlert(title: string, value: string) {
    const alert = await this.alertController.create({
      header: title,
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  createPaper(value) {
    let temp = [];

    shuffleInPlace(this.questions);
    console.log(this.questions);
    if (value.numQuestions <= this.questions.length)
    {
      let pattern = [];
      switch (value.difficulty) {
        case 'Easy': {
          pattern = [1, 2, 3, 4, 5];
          break;
        }
        case 'Medium': {
          pattern = [3, 4, 5, 2, 1];
          break;
        }
        case 'Hard': {
          pattern = [4, 5, 3, 2, 1];
          break;
        }
        default: {
          pattern = [1, 2, 3, 4, 5];
          break;
        }
      }

      for (let i of pattern) {
        for (let question of this.questions) {
          if (temp.length < value.numQuestions) {
            if (question.difficulty === i)
              temp.push(question.id);
          }
        }

        if (temp.length === value.numQuestions) {
          break;
        }
      }

      this.paperService.createPaper(value, temp)
      .then(res => {
        this.presentAlert('Success', 'Your paper has been created.');
        this.navCtrl.navigateBack('paper-list');
      }, err => {
        console.log(err);
        this.presentAlert('Error', err.message);
      });
    } else {
      this.presentAlert('Error', 'Not enough questions. Please add some questions.');
    }
  }

}

export function selectType(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    // set error on matchingControl if validation fails
    if (control.value === 'Select one') {
      control.setErrors({selectType: true});
    } else {
      control.setErrors(null);
    }
  };
}

export function shuffleInPlace<T>(array: T[]): T[] {
  if (array.length <= 1) return array;
  for (let i = 0; i < array.length; i++) {

    const randomChoiceIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
  }

  return array;
}
