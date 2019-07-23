import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import {AlertController, ToastController} from '@ionic/angular';
import {LogSignService} from '../service/user/logSign/logSign.service';
import {Conversations} from './Conversation';
import {Users} from './User';
import {Messages} from './Message';
@Injectable()
export class ConversationItems {
    interlocuteur1:Users=new Users();
    interlocuteur2:Users;
    lastMessage: Messages;
    conversation :Conversations;

    constructor( ){
        this.interlocuteur2=new Users();
        this.lastMessage=new Messages();
        this.conversation =new Conversations();

    }



}
