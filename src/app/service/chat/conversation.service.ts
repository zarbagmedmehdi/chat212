import {Injectable} from '@angular/core';
import {LogSignService} from '../user/logSign/logSign.service';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Conversations} from '../../model/Conversation';
import {Messages} from '../../model/Message';
import {ConversationItems} from '../../model/ConversationItem';
import {Users} from '../../model/User';
import {AngularFireAuth} from '@angular/fire/auth';
import {error} from 'selenium-webdriver';


@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    public found: boolean;
    public conversationMessages = this.db.collection('/messages');
public conversations:Conversations[]=[];
    constructor(public c: Conversations, public logSingService: LogSignService,
                public toastController: ToastController,
                public alert: AlertController,
                public db: AngularFirestore,
                public afAuth: AngularFireAuth,
                public message: Messages) {
    }

    public getUserById(id: string) {
        let user: Users = new Users();
        this.db.collection('users').doc(id).valueChanges().subscribe(cc => {
            user.cloneUser(cc);
        });
        return user;
    }

    public createConversationItems(conversations) {
        let cis: ConversationItems[] = [];
        for (let i = 0; i < conversations.length; i++) {

            let ci: ConversationItems = new ConversationItems();
            if (conversations[i].interlocuteur1 == this.afAuth.auth.currentUser.uid) {
                ci.interlocuteur1 = this.getUserById(conversations[i].interlocuteur1);
                ci.interlocuteur2 = this.getUserById(conversations[i].interlocuteur2);
            } else {
                ci.interlocuteur2 = this.getUserById(conversations[i].interlocuteur1);
                ci.interlocuteur1 = this.getUserById(conversations[i].interlocuteur2);

            }
            ci.lastMessage = this.getLastMessage(conversations[i].id);
            ci.conversation = conversations[i];
            cis.push(ci);
        }
        return cis;
    }

    public createConversation(c: Conversations,callback) {
        let bd = this.db;
        let id = '';
        try {
            this.db.collection('conversations').add({
                id: '',
                interlocuteur1: c.interlocuteur1, interlocuteur2: c.interlocuteur2, datePremierMessage: new Date(),
                bloqued: false, bloquedBy: '',
            }).then(function(docRef) {
                //console.log('Document written with ID: ', docRef.id);
                id = docRef.id;
                bd.doc('conversations/' + docRef.id).update({
                    id: docRef.id,
                });
                callback (id);

            });

        } catch (err) {
            //console.log(err);
        }
    }


    public getConversationById(id, callback) {
        let c: Conversations = new Conversations();
        this.db.collection('conversations')
            .doc(id)
            .valueChanges()
            .subscribe(cc => {
                this.cloneConversation(cc, c);
                callback(c);
            });
    }

    public cloneConversation(data: any, c: Conversations) {
        c.id = data.id;
        c.interlocuteur1 = data.interlocuteur1;
        c.interlocuteur2 = data.interlocuteur2;
        c.datePremierMessage = data.datePremierMessage;
        c.bloqued = data.bloqued;
        c.bloquedBy = data.bloquedBy;
    }

    public cloneConversation2(data: any, c: Conversations) {
        c.id = data.get('id');
        c.interlocuteur1 = data.get('interlocuteur1');
        c.interlocuteur2 = data.get('interlocuteur2');
        c.datePremierMessage = data.get('datePremierMessage');
        c.bloqued = data.get('bloqued');
        c.bloquedBy = data.get('bloquedBy');
    }

    public toString(c: Conversations) {
        //console.log('kkkkkkkkkkkkkkk');
        // console.log(c.id + 'h ' +
        //     c.interlocuteur1 + ' h  ' +
        //     c.interlocuteur2 + '  h' +
        //     c.datePremierMessage + ' h ' +
        //     c.bloqued + ' h' +
        //     +' ' + c.bloquedBy);
    }


     getConversationByInter(id1, id2) {

        this.db.collection('/conversations', ref => ref.
        where('interlocuteur1', '==', id1).where('interlocuteur2', '==', id2))
            .snapshotChanges().subscribe(actionArray => {
            actionArray.map(item => {
if(item.payload.doc.exists)
                    this.cloneConversation2(item.payload.doc, this.c);

            });
        });

    }

    getConversation(id1, id2 ,callback) {

           this.c = new Conversations();
        this.getConversationByInter(id1, id2);
        this.getConversationByInter(id2, id1);
        callback (this.c);

    }

    getConversations(id) {
        let conversations: Conversations[] = [];
        for (let i = 1; i < 3; i++) {
            var cc = this.db.collection('/conversations', ref =>
                ref.where('interlocuteur' + i, '==', id))
                .snapshotChanges();
            cc.subscribe(actionArray => {
                var list = actionArray.map(item => {
                    //console.log('got in here');
                    let conversation: Conversations = new Conversations();
                    this.cloneConversation2(item.payload.doc, conversation);
                    conversations.push(conversation);
                });
            });

        }
        setTimeout(() => {
        }, 2500);
        //console.log('get Conversations' + conversations);
        return conversations;
    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getLastMessage(conversation: string) {
        let message: Messages = new Messages();
        this.db.collection('/messages', ref => ref.where('conversation', '==', conversation).orderBy('dateEnvoi', 'desc')
            .limit(1)
        ).snapshotChanges().subscribe(actionArray => {
            actionArray.map(item => {
                if (item.payload.doc.exists) {
                    message.cloneMessage(item.payload.doc);
                    if (item.payload.doc.get('emeteur') == this.afAuth.auth.currentUser.uid) {
                        message.emeteur = 'envoyé : ';
                    } else {
                        message.emeteur = 'reçu :  ';
                    }
                } else {
                    //console.log('non existe');
                }
            });
        });
        this.delay(350);
        return message;

    }


    getMessages(conversation: string, callback) {
        let messages: Messages[] = [];
        this.db.collection('/messages', ref =>
            ref.where('conversation', '==', conversation)
        )
            .snapshotChanges()
            .subscribe(actionArray => {
                actionArray.map(item => {
                    let message: Messages = new Messages();
                    message.cloneMessage(item.payload.doc);
                    let find = messages.find((seach) => {
                         return this.getTime(seach.dateEnvoi) ==this.getTime(message.dateEnvoi) &&  seach.contenu == message.contenu;

                     });
                     if (!find) {
                        messages.push(message);
                      }
                });
                messages.sort((a: Messages, b: Messages) => {
                    return this.getTime(a.dateEnvoi) - this.getTime(b.dateEnvoi);
                });
                callback(messages);
            });
    }
    private getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
    }


    public sortByDueDate(): void {

    }



    // public eliminate(duplicated: Messages[]) {
    //     let originals: Messages[] = [];
    //     //console.log(duplicated.length + 'length');
    //     for (let i = 0; i < duplicated.length; i++) {
    //         //console.log(i + 'ha');
    //         let message = duplicated[i];
    //         let found = false;
    //         for (let j = 0; i < duplicated.length; j++) {
    //             duplicated[j].id == message.id ? found = true : found = false;
    //         }
    //         if (found == false) {
    //             originals.push(message);
    //         }
    //
    //     }
    //     return originals;
    // }

    public createMessage(message: Messages, callback) {
        let id = '';
        let bd = this.db;
        try {
            this.db.collection('messages').add
            ({
                contenu: message.contenu,
                dateEnvoi: message.dateEnvoi,
                conversation: message.conversation,
                typeContenu: message.typeContenu,
                emeteur: message.emeteur,
            })
               // .then(function (){
//                  .then(function(docRef) {
// console.log("createMessage"+message.contenu);
//                 id = docRef.id;
//                 bd.doc('messages/' + docRef.id).update({
//                     id: docRef.id,
//                 });
                  //   message.id=docRef.id;
                     // console.log("after \n");
              //       console.log("createMessage"+message.id);
//
               callback();
        //     });
        } catch (err) {
            console.log(err);
            callback("");
        }
    }
     makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
