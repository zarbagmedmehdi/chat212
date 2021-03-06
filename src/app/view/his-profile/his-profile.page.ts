import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../../model/User';
import {AngularFireAuth} from '@angular/fire/auth';
import {ConversationService} from '../../service/chat/conversation.service';
import {Conversations} from '../../model/Conversation';

import { CallNumber } from '@ionic-native/call-number/ngx';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {Messages} from '../../model/Message';
import {AlertController, Platform} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-his-profile',
  templateUrl: './his-profile.page.html',
  styleUrls: ['./his-profile.page.scss'],
})
export class HisProfilePage  {

    private getRoute: any;
    private conversations:Conversations[]=[];
    private idProfile:string="";
    private idConversation:string="";
  constructor(

      private iab: InAppBrowser,
public platform: Platform,
      public alert :AlertController,
    private callNumber: CallNumber,
      private router:Router,  public  conversation:Conversations,
  private conversationService:ConversationService, private afAuth :AngularFireAuth, private profileUser :Users,private  route :ActivatedRoute) {
  }

    ionViewWillEnter() {
    this.getRoute = this.route.params.subscribe(params => {
      this.profileUser.getUserById(params['id']);
      this.idProfile=params['id'];


    });
      this.conversation=new Conversations();
        this.conversationService.getConversation(this.afAuth.auth.currentUser.uid,this.idProfile,
            (conversation: Conversations) => {
            this.conversation=conversation;
            });

//console.log("ngOnInit his profile :",this.afAuth.auth.currentUser.uid);

  }
     goToConversation(){
             if  (this.conversation.id != "") {
                  this.router.navigate(['conversation', this.conversation.id]);
              }
              else {
                 this.conversation.interlocuteur1 = this.afAuth.auth.currentUser.uid;
                 this.conversation.interlocuteur2 = this.idProfile;
                 this.conversationService.createConversation(this.conversation, (id: string) => {
                     let message: Messages = new Messages();

                     message.emeteur = this.afAuth.auth.currentUser.uid;
                     message.conversation = id;
                     message.contenu = "Cette personne veut se contacter";
                     message.typeContenu = 'text';

                     this.conversationService.createMessage(message, () => {
                     this.router.navigate(['conversation', id]);
                     })
                 })
             };


              }


    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

call(){
  this.callNumber.callNumber(this.profileUser.telephone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => alert(err));
}

   async seeDescription() {
       let alert = await this.alert.create({
           header: '            Sa description',
           subHeader: this.profileUser.description,
           buttons: ['Dismiss']
       });
        await alert.present();

    }

    showCv() {


        }
}
