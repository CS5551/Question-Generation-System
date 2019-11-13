import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OcrPage } from './ocr.page';
import {NgProgressModule} from '@ngx-progressbar/core';

const routes: Routes = [
  {
    path: '',
    component: OcrPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgProgressModule
    ],
  declarations: [OcrPage]
})
export class OcrPageModule {}
