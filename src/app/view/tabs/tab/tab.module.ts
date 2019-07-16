import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabPage } from './tab.page';

import{TabPageRoutingModule} from './tab-routing.module';
import {ProfilePage} from '../profile/profile.page';
import {ProfilePageModule} from '../profile/profile.module';
import {SearchPageModule} from '../search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageModule,
    SearchPageModule,
    TabPageRoutingModule,
  ],
  exports: [
    TabPage
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
