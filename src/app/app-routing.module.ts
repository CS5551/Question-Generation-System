import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
},
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'question-add', loadChildren: './question/question-add/question-add.module#QuestionAddPageModule', canActivate: [AuthGuard] },
  { path: 'question-edit/:id', loadChildren: './question/question-edit/question-edit.module#QuestionEditPageModule' , canActivate: [AuthGuard] },
  { path: 'paper-create', loadChildren: './paper/paper-create/paper-create.module#PaperCreatePageModule', canActivate: [AuthGuard] },
  { path: 'paper-list', loadChildren: './paper/paper-list/paper-list.module#PaperListPageModule', canActivate: [AuthGuard]  },
  { path: 'paper-edit/:id', loadChildren: './paper/paper-edit/paper-edit.module#PaperEditPageModule' },
  { path: 'ocr', loadChildren: './ocr/ocr.module#OcrPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
