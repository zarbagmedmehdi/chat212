import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable()
export class Conversations {
    public id: string;
    public interlocuteur1: string;
    public interlocuteur2: string;
    public datePremierMessage: Date;
    public bloqued: boolean;
    public bloquedBy: string;
    constructor() {
        this.id="";
        this.interlocuteur1="";
        this.interlocuteur2="";
        this.datePremierMessage=new Date();
        this. bloqued=false;
        this.bloquedBy="";
    }
    public toString(){
    console.log(    this.id+" "+
        this.interlocuteur1+" "+
        this.interlocuteur2+" "+
        this.datePremierMessage+" "+
        this. bloqued+" "+
        this.bloquedBy+" ");
    }

}

