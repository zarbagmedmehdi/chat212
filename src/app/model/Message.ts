import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {AngularFireAuth} from '@angular/fire/auth';

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



    cloneMessage(data:any) {
        this.contenu = data.get("contenu");
        this.dateEnvoi = new Date(data.get("dateEnvoi").seconds * 1000);
        this.typeContenu = data.get("typeContenu");
        this.emeteur = data.get("emeteur");;
        this.conversation = data.get("conversation");
    }
    cloneMessage2(data:any) {
        this. contenu=data.contenu;
        this.dateEnvoi =new Date(data.dateEnvoi.seconds*1000);
        this.typeContenu=data.typeContenu;
        this. emeteur=data.emeteur;
        this. conversation=data.conversation;
    }





}
