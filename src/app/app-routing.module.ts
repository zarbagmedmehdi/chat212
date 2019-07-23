import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tab', loadChildren: './view/tabs/tab/tab.module#TabPageModule' },
  { path: 'home', loadChildren: './view/home/home.module#HomePageModule' },
  { path: 'inscription', loadChildren: './view/inscription/inscription.module#InscriptionPageModule' },
  { path: 'his-profile/:id', loadChildren: './view/his-profile/his-profile.module#HisProfilePageModule' },
  { path: 'conversations', loadChildren: './view/tabs/conversations/conversations.module#ConversationsPageModule' },
  { path: 'conversation', loadChildren: './view/conversation/conversation.module#ConversationPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
