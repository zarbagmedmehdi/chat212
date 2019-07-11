import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InscriptionPage } from './inscription.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InscriptionPage }]),
    ReactiveFormsModule,
  ],

  declarations: [InscriptionPage]
})
export class InscriptionPageModule {

}
