import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {Question, QuestionService} from "../../services/question.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
})
export class QuestionEditPage implements OnInit {
  types: Array<string>;
  difficulties: Array<any>;

  validations_form: FormGroup;
  validation_messages = {
    question: [
      {type: 'required', message: 'Question is required'},
    ],
    type: [
      {type: 'selectType', message: 'Please select type'}
    ],
    subject: [
      {type: 'required', message: 'Subject is required'},
    ],
    choices: [],
    difficulty: [
      {type: 'selectType', message: 'Please select difficulty'}
    ],
  };

  questionItem: Question = {
    question: '',
    type: '',
    difficulty: 1,
    subject: '',
    choices: [],
  };

  questionId = null;
  subscr: Subscription;

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private questionService: QuestionService,
              private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.types = [
      'Select one',
      'Choice',
      'Text',
    ];

    this.difficulties = [
      'Select one',
      1, 2, 3, 4, 5
    ];

    this.questionId = this.route.snapshot.params['id'];
    if (this.questionId) {
      this.subscr = this.questionService.getQuestion(this.questionId).subscribe(res => {
        this.questionItem = res;
      });
    }

    this.buildForm();
  }

  private buildForm() {
    this.validations_form = this.formBuilder.group({
      question: new FormControl(this.questionItem.question, Validators.compose([
        Validators.required,
      ])),
      type: new FormControl(this.questionItem.type, Validators.compose([
        Validators.required,
      ])),
      subject: new FormControl(this.questionItem.subject, Validators.compose([
        Validators.required,
      ])),
      choices: this.formBuilder.array([]),
      difficulty: new FormControl(this.questionItem.difficulty, Validators.compose([
        Validators.required,
      ])),
    }, {
      validators: [
        selectType('type'),
        selectType('difficulty')]
    });

    for (let item of this.questionItem.choices) {
      this.addItem(item.choice.toString());
    }
  }

  ionViewDidEnter() {
    this.buildForm();
  }

  ionViewDidLeave() {
    this.subscr.unsubscribe();
  }

  createItem(value): FormGroup {
    return this.formBuilder.group({
      choice: new FormControl(value, Validators.compose([
        Validators.required,
      ])),
    });
  }

  addItem(value): void {
    const choices = this.validations_form.get('choices') as FormArray;
    choices.push(this.createItem(value));
  }

  removeItem(index) {
    const choices = this.validations_form.get('choices') as FormArray;
    choices.removeAt(index);
  }

  removeChoices() {
    const choices = this.validations_form.get('choices') as FormArray;
    choices.clear();
  }

  async presentAlert(title: string, value: string) {
    const alert = await this.alertController.create({
      header: title,
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  updateQuestion(value) {
    this.questionService.updateQuestion(value, this.questionId)
    .then(res => {
      console.log(res);
      this.presentAlert('Success', 'Your question has been updated.');
      this.navCtrl.navigateBack('list');
    }, err => {
      console.log(err);
      this.presentAlert('Error', err.message);
    });
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
