import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {PaperService} from '../../services/paper.service';

@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.page.html',
  styleUrls: ['./paper-list.page.scss'],
})
export class PaperListPage implements OnInit {

  private papersSubscr: Subscription;
  papers = [];

  constructor(private paperService: PaperService,
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
    this.papersSubscr = this.paperService.getPapers().subscribe(res => {
      if (res.length !== 0) {
        this.papers = res;
      }
    });
  }

  ionViewWillLeave() {
    this.papersSubscr.unsubscribe();
  }

  async deletePaper(paper: any) {
    const prompt = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to delete the paper?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.paperService.deletePaper(paper.id)
            .then(res => {
              this.presentAlert('Success', 'Paper deleted');
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
