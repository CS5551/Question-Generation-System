import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalGenerateListPage } from './modal-generate-list.page';

const routes: Routes = [
  {
    path: '',
    component: ModalGenerateListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalGenerateListPage]
})
export class ModalGenerateListPageModule {}
