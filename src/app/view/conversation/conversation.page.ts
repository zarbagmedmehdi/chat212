import {Users} from '../../model/User';
import {Messages} from '../../model/Message';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConversationService} from '../../service/chat/conversation.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Conversations} from '../../model/Conversation';
import {tick} from '@angular/core/testing';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage {
    private conversation: Conversations = new Conversations();
    private friend: Users = new Users();
    private myProfile: Users = new Users();
    private messages: Messages[]=[];
    @ViewChild('content') private content: any;

    private input: string = '';
    private emeteur: string;
    private cc = '1';
    private bb = '2';

    constructor(private afAuth: AngularFireAuth, private cns: ConversationService, private route: ActivatedRoute) {
    }

    ionViewWillEnter() {
        this.dd();

    }
    doScrollToBottom() {
        setTimeout(()=>{this.content.scrollToBottom();},600);
    }
    dd() {
        this.emeteur = this.afAuth.auth.currentUser.uid;
        this.route.params.subscribe(async params => {
            this.cns.getConversationById(params['id'], (conversation: Conversations) => {
                this.cns.getMessages(conversation.id, (messages) => {
                    this.messages = messages;
                    this.conversation.id=conversation.id;
                    if (conversation.interlocuteur1 == this.afAuth.auth.currentUser.uid) {
                        this.friend = this.cns.getUserById(conversation.interlocuteur2);
                    } else {
                        this.friend = this.cns.getUserById(conversation.interlocuteur1);
                    }
                    this.doScrollToBottom();

                });

            });
        });

    }

    // scrollToBottom() {
    //   setTimeout(() => {
    //   //  this.content.scrollToBottom(300);
    //   });
    // }


    doSend() {
        if (this.input.length > 0) {

            let message: Messages = new Messages();

            message.emeteur = this.emeteur;
            message.conversation = this.conversation.id;
            message.contenu = this.input;
            message.typeContenu = 'text';
            // console.log("before \n");
            // console.log(message)
            this.cns.createMessage(message, () => {
                this.input = '';
//this.messages.push(message);
                let find = this.messages.find((seach) => {
                    return (seach.dateEnvoi.getTime()) ==(message.dateEnvoi.getTime()) &&  seach.contenu == message.contenu;


                });

                if (!find) {
                    console.log(find.contenu);
                 this.messages.push(message);
                 this.doScrollToBottom();

                 }
            });


        }

    }




    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}


