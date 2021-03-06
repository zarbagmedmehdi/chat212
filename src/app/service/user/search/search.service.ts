import { Injectable } from '@angular/core';
import {LogSignService} from '../logSign/logSign.service';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Users} from '../../../model/User';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(                public afAuth: AngularFireAuth,
              public toastController:ToastController,
              public alert: AlertController,
              public db: AngularFirestore) {


  }

  getUsers(variable:string, valeur:string){
  let users:Users[]=[];

   var cc=  this.db.collection('/users',ref =>ref.where(variable, '==', valeur) ).snapshotChanges();
   cc.subscribe(actionArray => {
     var list = actionArray.map(item => {
         let user :Users=new Users();
        user.cloneUser2(item.payload.doc);
         let find = users.find((search) => {
             console.log()
             return (search.id) ==user.id ;

         });
         if (!find) {
             if (user.id!=this.afAuth.auth.currentUser.uid)
             users.push(user);
         }
        //console.log("id dyal searrch"+user.id);
      })
    })
     return users;
  }
    getUsersByFullName(nom:string,prenom:string){
        let users:Users[]=[];

        var cc=  this.db.collection('/users',ref =>ref.where("prenom", '==', prenom).where("nom", '==', nom)
        ).snapshotChanges();
        cc.subscribe(actionArray => {
            var list = actionArray.map(item => {
                let user :Users=new Users();
                user.cloneUser2(item.payload.doc);
                let find = users.find((search) => {
                    console.log()
                    return (search.id) ==user.id ;

                });
                if (!find) {
                    if (user.id!=this.afAuth.auth.currentUser.uid)
                        users.push(user);
                }
                //console.log("id dyal searrch"+user.id);
            })
        })
        return users;
    }






}
