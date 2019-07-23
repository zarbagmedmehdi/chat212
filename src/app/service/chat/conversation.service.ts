import { Injectable } from '@angular/core';
import {LogSignService} from '../user/logSign/logSign.service';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Conversations} from '../../model/Conversation';
import {Messages} from '../../model/Message';
import {ConversationItems} from '../../model/ConversationItem';
import {Users} from '../../model/User';


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
    public found:boolean;
  constructor(public c:Conversations,public logSingService:LogSignService,
              public toastController:ToastController,
              public alert: AlertController,
              public db: AngularFirestore,
  public message:Messages) {


  }
    public getUserById(id: string) {
let user:Users=new Users();
        this.db.collection('users').doc(id).valueChanges().subscribe(cc => {
            user.cloneUser(cc);});
        return user;
    }
   public   createConversationItems(conversations) {
     let  cis:ConversationItems[]=[];
       for (let i = 0; i < conversations.length; i++) {

           let ci: ConversationItems = new ConversationItems();
           ci.interlocuteur1=this.getUserById(conversations[i].interlocuteur1);
           console.log(ci.interlocuteur1.nom);
           ci.interlocuteur2=this.getUserById(conversations[i].interlocuteur2);
           console.log(ci.interlocuteur2.nom);
           ci.lastMessage=this.getLastMessage(conversations[i].id);
           ci.conversation = conversations[i];
          cis.push(ci);
       }
       return cis;
   }
    public  createConversation(c: Conversations) {
      let bd=this.db;
      let id="";
        try {
            this.db.collection('conversations').add({
                id: "",
                interlocuteur1: c.interlocuteur1, interlocuteur2: c.interlocuteur2, datePremierMessage: new Date(),
                bloqued: false, bloquedBy: "",
            }).then(function(docRef) {
               console.log("Document written with ID: ", docRef.id);
id =docRef.id;
                bd.doc('conversations/'+docRef.id).update({
                    id: docRef.id,
                })

            })

return id;
        } catch (err) {
            console.log(err);
        }
    }


    // public async  getConversationById(c:Conversations) {
    //
    //      this.db.collection('conversations').doc(
    //         'CXdWVkIjUJtKXs19NN8KB').valueChanges().subscribe(cc => {
    //          this.delay(300);
    //         this.cloneConversation(cc,c);});
    //
    // }

    // public  cloneConversation(data: any,c:Conversations) {
    //     c.id=data.id;
    //     c.interlocuteur1=data.interlocuteur1;
    //     c.interlocuteur2=data.interlocuteur2;
    //     c.datePremierMessage=data.datePremierMessage;
    //     c. bloqued=data.bloqued;
    //     c.bloquedBy=data.bloquedBy;
    // }
    public  cloneConversation2(data: any,c:Conversations) {
        c.id=data.get("id");
        c.interlocuteur1=data.get("interlocuteur1");
        c.interlocuteur2=data.get("interlocuteur2");
        c.datePremierMessage=data.get("datePremierMessage");
        c. bloqued=data.get("bloqued");
        c.bloquedBy=data.get("bloquedBy");
    }
    public   toString(c :Conversations){
        console.log("kkkkkkkkkkkkkkk");
        console.log(    c.id +"h "+
            c.interlocuteur1 +" h  "+
            c.interlocuteur2 +"  h"+
            c.datePremierMessage +" h "+
            c. bloqued +" h"+
            +" "+c.bloquedBy);
    }


   async  getConversationByInter(id1, id2) {

       this.db.collection('/conversations',ref =>ref.where("interlocuteur1", '==', id1).
       where("interlocuteur2", '==', id2)).
       snapshotChanges().subscribe(actionArray => {
            actionArray.map( item => {
                if (item.payload.doc.exists  ) {
                    console.log("l9inaah");

                    this.cloneConversation2(item.payload.doc, this.c);
                } else {
                    console.log("non existe");

                }
            })
       })
       await     this.delay(350);

   }
      getConversation(id1,id2) {
      console.log(id1);
        console.log(id2);
this.c=new Conversations();
    this.getConversationByInter(id1, id2);
    this.getConversationByInter(id2, id1);
      return  this.c;

   }
  getConversations(id){
    let conversations:Conversations[]=[];
    for (let i=1;i<3;i++) {
        var cc = this.db.collection('/conversations', ref =>
            ref.where("interlocuteur"+i, '==', id))
            .snapshotChanges();
        cc.subscribe(actionArray => {
            var list = actionArray.map(item => {
                let conversation: Conversations = new Conversations();
                this.cloneConversation2(item.payload.doc, conversation);
                conversations.push(conversation);
            })
        })

    }
      setTimeout(() => {}, 2500);
      console.log("get Conversations"+conversations);
      return conversations;
  }


    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    getLastMessage(conversation:string){
let message :Messages=new Messages();
        this.db.collection('/messages',ref =>ref.where("conversation", '==', conversation).orderBy("dateEnvoi","desc")
            .limit(1)
        ).

        snapshotChanges().subscribe(actionArray => {
            actionArray.map( item => {
                if (item.payload.doc.exists  ) {

                    message.cloneMessage(item.payload.doc);
                } else {
                    console.log("non existe");

                }
            })
        })
        this.delay(350);
        //    citiesRef.where("population", ">", 100000).orderBy("population").limit(2)
        return message;

    }
}
