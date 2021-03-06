import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OCR, OCRSourceType } from '@ionic-native/ocr/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './services/auth.service';
import { Camera } from '@ionic-native/camera/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NgProgressModule } from '@ngx-progressbar/core';
import {AngularFireStorageModule, StorageBucket} from "@angular/fire/storage";
import {ModalListPageModule} from "./modal/modal-list/modal-list.module";
import {identifierModuleUrl} from '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import {ModalGenerateListPageModule} from "./modal/modal-generate-list/modal-generate-list.module";

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgProgressModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ModalListPageModule,
    ModalGenerateListPageModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
      FileOpener,
    AuthService,
      OCR,
    Camera,
      File,
    NativeStorage,
    TextToSpeech,
    File,
    FileOpener,
    { provide: StorageBucket, useValue: 'gs://question-generation-system.appspot.com' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
