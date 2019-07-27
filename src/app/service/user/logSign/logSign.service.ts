import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {Users} from '../../../model/User';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LogSignService {
    public  jobs=  ["Software Developer","Network Engineer",
        "Network Administrator","Computer Scientist","Systems Analyst","Business Analyst"
        ,"Tech Support","IT Consultant","Software Tester","Cloud Architect"
        ,"Customer Support Administrator",
        "Database Administrator"];

    namePattern = "^[a-zA-Z ]{4,25}$";
    pwdPattern = "^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$";
    pwdPattern2 = ".{6,}";

    mobnumPattern = "^((\\+[0-9]{3}-?)|0)?[0-9]{9}$";
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    public formBuilder: FormBuilder
 public  logForm : FormGroup;

 public patterns:any;
    public patterns2:any;


    constructor(public toastController:ToastController, public alert : AlertController, ) {
    this.patterns={
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern),
      ])],
      password: ['', Validators.required],
  };
      this.patterns2={
          email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
          nom: ['', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
          prenom: ['', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
          password: ['', Validators.compose([Validators.required, Validators.pattern(this.pwdPattern2)])],
          cpassword: ['', Validators.compose([Validators.required, Validators.pattern(this.pwdPattern2)])],
          telephone: ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
          pays: ['', Validators.compose([Validators.required])],
          job: ['', Validators.compose([Validators.required])],
          dateNaissance: [],

      };
    }


  alertConnexion(err){
    if (err == "auth/user-not-found") {
        this.showAlert("", "les données  entré ne correspondent à aucun compte. ")
    } else this.showAlert("", err)

  }
  async showAlert(header:string,message:string){
    const alert =await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })
await alert.present();
  }
    async presentToast(message,color='light') {
        const toast = await this.toastController.create({
            message: message,
            duration: 2800,
            color:color,
        });
        toast.present();
    }
  manageInterface(isHidden,iconMargin1,iconMargin2){
    isHidden == true ? isHidden = false : isHidden = true;
    isHidden == true ? iconMargin1 = "90px" : iconMargin1 = "0px";
    isHidden == true ? iconMargin2 = "0px" : iconMargin2 = "90px";
    //console.log("cas 2");

  }
  testconnection(status,internetConnection,isHidden){
    status.connected==true   ?
        alert(" changement :Vous etes  Connecté a Internet") : alert(" changement :Vous avez pas de Connexion internet");
    status.connected==false  ?  internetConnection=false : internetConnection=true
    status.connected==false  ?  isHidden=true : isHidden=false

    //console.log("on init");
    //console.log("internetConnection"+internetConnection);
    //console.log("this hiddden"+isHidden);
    //console.log ("status dyal fonction"+status.connected);
  }
    updatePassword(newPassword){
        var cUser = firebase.auth().currentUser;
        cUser.updatePassword(newPassword).then(function() {
return 1;
        }).catch(function(error) {
            //console.log(error.message);
            return error.message;
        });
    }
    passwordVerification(ps:string,old:string,nv1:string,nv2:string){
        if(old.length==0 || nv1.length==0 ||nv2.length==0 )  {this.presentToast('champs non remplies','danger');return false;}
     else if  (ps==old && nv1==nv2) {return true;}
     else if(ps!=old ) {this.presentToast('Mot de passe est faux','danger');return false;}
     else if  (nv1!=nv2 ){this.presentToast('les mot de passe ne sont pas identique','danger');return false;}
}

    sendVerificationEmail ( afAuth: AngularFireAuth ,email:string ){
        //console.log("sendverificationEmail");
        afAuth.auth.currentUser.sendEmailVerification()
        // afAuth.auth.sendSignInLinkToEmail(email,actionCodeSettings)
            .then(function() {
                //console.log("un email a été envoyé");
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function(error) {
                //console.log(error);
            });
    }
    validatePhone(data):boolean {
        if( /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(data.telephone) ){
            return true;}
        else {return  false;}
    }
}
