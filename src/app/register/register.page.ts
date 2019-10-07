import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertController, MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public info: any = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  constructor(private authService: AuthService,
              private alertController: AlertController,
              private navCtrl: NavController,
              private menuCtrl:MenuController,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  register() {
    this.authService.register(this.info)
      .then(res => {
        this.presentAlert('Your account has been created. Please log in.');
        this.goLoginPage();
      }, err => {
        this.presentAlert(err.message);
      });
  }

  cancel() {
    this.navCtrl.navigateBack('');
  }

  async presentAlert(value: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
