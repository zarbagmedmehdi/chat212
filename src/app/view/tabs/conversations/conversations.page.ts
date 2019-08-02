import { Component, OnInit } from '@angular/core';
import {ConversationService} from '../../../service/chat/conversation.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Conversations} from '../../../model/Conversation';
import {ConversationItems} from '../../../model/ConversationItem';
import {delay} from 'rxjs/operators';
import {Messages} from '../../../model/Message';
import {Users} from '../../../model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage  {
  public conversations:Conversations[]=[];
  public conversationsItems:ConversationItems[]=[];
  public    message:Messages=new Messages();

  constructor(private router: Router, public  afAuth: AngularFireAuth,public convService: ConversationService) {

  }

   async ionViewWillEnter() {
     this.convService.getConversations(this.afAuth.auth.currentUser.uid,async(conversations)=>{
await this.delay(500);
     //console.log(this.conversations.length);
     this.convService.createConversationItems(conversations,async(list)=>{
       await this.delay(500);

       list.sort((a: ConversationItems, b: ConversationItems) => {
       if (b.lastMessage.dateEnvoi.getMonth() == a.lastMessage.dateEnvoi.getMonth() && b.lastMessage.dateEnvoi.getDay() == a.lastMessage.dateEnvoi.getDay()) {
         console.log(1);
         return b.lastMessage.dateEnvoi.getHours() - a.lastMessage.dateEnvoi.getHours();
       } else {
         console.log(b.lastMessage.dateEnvoi
             + "" + a.lastMessage.dateEnvoi);
         return b.lastMessage.dateEnvoi.getDate() - a.lastMessage.dateEnvoi.getDate();

       }
     });
     this.conversationsItems=list;
     });
     });
   }

   // bb(){
   //   //console.log(this.conversations.length);
   //   this.conversationsItems=this.convService.createConversationItems(this.conversations);
   //
   // }
     delay(ms: number) {
       return new Promise( resolve => setTimeout(resolve, ms) );
     }

  goToConversation(id:string) {
    this.router.navigate(['conversation',id]);
  }
}
