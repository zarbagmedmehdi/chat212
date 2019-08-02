import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import {Network} from '@ionic-native/network/ngx';

import {Users} from './model/User';
import {SearchService} from './service/user/search/search.service';
import {LogSignService} from './service/user/logSign/logSign.service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {Conversations} from './model/Conversation';
import {ConversationService} from './service/chat/conversation.service';
import {Messages} from './model/Message';
import {NotificationService} from './service/notification.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      HttpClientModule,
    AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule ,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule],
  providers: [

      Network,
NotificationService,
      InAppBrowser,
    CallNumber,
      Messages,
      Geolocation,
    Users,
      Conversations,
      ConversationService,
    SearchService,
    LogSignService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy , useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
