import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable()
export class Messages {
    public contenu:string;
    public dateEnvoi:Date;
    public typeContenu:string;
    public emeteur:string;
    public conversation:string;
    constructor(private db?:AngularFirestore) {
    this. contenu="";
    this. dateEnvoi=new Date();
     this.typeContenu="";
    this.emeteur="";
    this.conversation="";
    }


    public  createMessage() {
        let bd=this.db;
 let m:Messages=this;
let id="";
        try {
            this.db.collection('messages').add({
                contenu: m.contenu,
                dateEnvoi: m.dateEnvoi,
                conversation: m.conversation,
                typeContenu: false,
                emeteur: m.emeteur,
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                 id =docRef.id;
                this.bd.doc('messages/'+docRef.id).update({
                    id: docRef.id,
                })
            })

            return id;
        } catch (err) {
            console.log(err);
        }
    }
    cloneMessage(data:any) {
        this. contenu=data.get("contenu");
        this. dateEnvoi=data.get("dateEnvoi");
        this.typeContenu=data.get("typeContenu");
        this. emeteur=data.get("emetteur");;
        this. conversation=data.get("contenu");;
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
