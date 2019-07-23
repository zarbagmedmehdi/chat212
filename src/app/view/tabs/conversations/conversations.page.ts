import { Component, OnInit } from '@angular/core';
import {ConversationService} from '../../../service/chat/conversation.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Conversations} from '../../../model/Conversation';
import {ConversationItems} from '../../../model/ConversationItem';
import {delay} from 'rxjs/operators';
import {Messages} from '../../../model/Message';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {
  public conversations:Conversations[]=[];
  public conversationsItems:ConversationItems[]=[];
  public    message:Messages=new Messages();

  constructor( public  afAuth: AngularFireAuth,public convService: ConversationService) {

  }

   async ngOnInit() {
    // console.log(this.afAuth.auth.currentUser.uid);
     this.conversations = this.convService.getConversations(this.afAuth.auth.currentUser.uid);
await this.delay(800);
     console.log(this.conversations.length);
     this.conversationsItems=this.convService.createConversationItems(this.conversations);


   }
   bb(){
     console.log(this.conversations.length);
     this.conversationsItems=this.convService.createConversationItems(this.conversations);

   }
     delay(ms: number) {
       return new Promise( resolve => setTimeout(resolve, ms) );
     }


  cc() {
    console.log("haniiiiiiiiii"+this.conversationsItems);

  }
}
