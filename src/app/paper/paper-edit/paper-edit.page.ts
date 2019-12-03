import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Question, QuestionService} from '../../services/question.service';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Paper, PaperService} from '../../services/paper.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.page.html',
  styleUrls: ['./paper-edit.page.scss'],
})
export class PaperEditPage implements OnInit {

  // private questionSubscr: Subscription;
  private paperSubscr: Subscription;
  questions: Array<Question> = [];
  paperId = null;
  paper: Paper = {
    questions: [],
    title: '',
    difficulty: '',
  };
  pdfObj = null;

  constructor(private questionService: QuestionService,
              private paperService: PaperService,
              private alertController: AlertController,
              private route: ActivatedRoute,
              private file: File,
              private fileOpener: FileOpener,
              private plt: Platform
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
        console.log(this.paper);
        this.questions = this.questionService.getQuestionsOnPaper(this.paper.questions);
      });
    }
  }

  ionViewWillLeave() {
    // this.questionSubscr.unsubscribe();
    this.paperSubscr.unsubscribe();
  }

  createPdf() {
    let content: Array<any> = [
      { text: this.paper.title, style: 'header' },
      { text: 'Questions', style: 'subheader'},
    ];

    for (let i = 0; i < this.questions.length; i++) {
      content.push({ text: (i + 1) + '. ' + this.questions[i].question, style: 'question' });
    }

    const docDefinition = {
      pageSize: 'LETTER',
      pageMargins: [ 40, 60, 40, 60 ],
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        question: {
          fontSize: 14,
          margin: [0, 15, 0, 0]
        },
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'Questionpaper.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'Questionpaper.pdf', 'application/pdf');
        })
      });
    } else {

      this.pdfObj.download();
    }
  }
}
