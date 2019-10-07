import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../services/question.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.page.html',
  styleUrls: ['./question-add.page.scss'],
})
export class QuestionAddPage implements OnInit {
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
    difficulty: [
      {type: 'selectType', message: 'Please select difficulty'}
    ],
  };

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private questionService: QuestionService,
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

    this.validations_form = this.formBuilder.group({
      question: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      type: new FormControl(this.types[0], Validators.compose([
        Validators.required,
      ])),
      subject: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      difficulty: new FormControl(this.difficulties[0], Validators.compose([
        Validators.required,
      ])),
    }, {
      validators: [
        selectType('type'),
        selectType('difficulty')]
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

  createQuestion(value) {
    this.questionService.createQuestion(value)
        .then(res => {
          console.log(res);
          this.presentAlert('Success', 'Your question has been created.');
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
