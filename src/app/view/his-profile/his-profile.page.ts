import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../../model/User';
import {CallNumber} from '@ionic-native/call-number';
import {AngularFireAuth} from '@angular/fire/auth';
import {ConversationService} from '../../service/chat/conversation.service';
import {Conversations} from '../../model/Conversation';
import {Injectable} from '@angular/core';
import {AngularFirestore, } from '@angular/fire/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {ProfilePage} from '../tabs/profile/profile.page';
@Component({
  selector: 'app-his-profile',
  templateUrl: './his-profile.page.html',
  styleUrls: ['./his-profile.page.scss'],
})
export class HisProfilePage implements OnInit {
  private getRoute: any;
    private conversations:Conversations[]=[];
    private idProfile:string="";
    private idConversation:string="";
  constructor( private router:Router,  public  conversation:Conversations,
  private conversationService:ConversationService, private afAuth :AngularFireAuth, private profileUser :Users,private  route :ActivatedRoute) {
  }

  async ngOnInit() {
    this.getRoute = this.route.params.subscribe(params => {
      this.profileUser.getUserById(params['id']);
      this.idProfile=params['id'];


    });
      this.conversation=new Conversations();

//console.log("ngOnInit his profile :",this.afAuth.auth.currentUser.uid);

  }
   async  goToConversation(){
      //console.log("goToConversation");
       this.conversation=this.conversationService.getConversation(this.afAuth.auth.currentUser.uid,this.idProfile);
       await  this.delay(1000);
       //console.log(" hahya "+this.conversation);

       if(this.conversation.id==""){
    //console.log("mal9inach");
this.conversation.interlocuteur1=this.afAuth.auth.currentUser.uid;
this.conversation.interlocuteur2=this.idProfile;
    this.idConversation=this.conversationService.createConversation(this.conversation);
this.conversation.id=this.idConversation;
   // this.router.navigate(['conversation',this.idConversation]);

}
else {
    //console.log("l9inah");
}
       this.router.navigate(['conversation',this.conversation.id]);

   }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }



}
