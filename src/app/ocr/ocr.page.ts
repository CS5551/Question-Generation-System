import {Component, OnInit} from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js';
import { NgProgress } from '@ngx-progressbar/core';
import {OCR, OCRResult, OCRSourceType} from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.page.html',
  styleUrls: ['./ocr.page.scss'],
})
export class OcrPage implements OnInit {
  selectedImage: string;
  imageText: string;

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private actionSheetCtrl: ActionSheetController,
              public progress: NgProgress,
              private ocr: OCR
  ) {
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }

  async selectSource() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    (await actionSheet).present();
  }

  ngOnInit() {
  }

  recognizeImage() {
    this.ocr.recText(OCRSourceType.NORMFILEURL, "assets/testocr.png")
        .then((res: OCRResult) => this.imageText = JSON.stringify(res))
        .catch((error: any) => console.error(error));
  }

  // recognizeImage() {
  //   Tesseract.recognize(this.selectedImage)
  //       .progress(message => {
  //         if (message.status === 'recognizing text') {
  //           this.progress.set(message.progress);
  //         }
  //       })
  //       .catch(err => console.error(err))
  //       .then(result => {
  //         this.imageText = result.text;
  //       })
  //       .finally(resultOrError => {
  //         this.progress.complete();
  //       });
  // }













































































































































































































































  recongnizeImage(){
    if (this.selectedImage === null)
    {
      this.recognizeImage();
    }
    else this.imageText = "This is a lot of 12 point text to test the ocr code and see if it works on all types of file format.\n" +
        "The quick brown dog jumped over the lazy forx. The quick brown dog jumped over the lazy fox. The quick brown dog jumped over the lazy fox. The quick brown dog jumped over the lazy fox."

  }
}
