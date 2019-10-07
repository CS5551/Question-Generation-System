import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertController, MenuController, NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: '';
  password: '';

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              public alertController: AlertController,
              private menuCtrl: MenuController
  ) {
  }

  ionViewWillEnter() {
    console.log(firebase.auth().currentUser);
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  async presentAlert(value) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {
    this.authService.login(this.email, this.password)
        .then(res => {
          this.navCtrl.navigateForward('/home');
        }, err => {
          this.presentAlert(err.message);
        });
  }
}
