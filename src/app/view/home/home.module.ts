import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import {Network} from '@ionic-native/network';
import { HomePage } from './home.page';

@NgModule({
  imports: [

    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ReactiveFormsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
