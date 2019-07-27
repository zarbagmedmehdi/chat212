import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Users} from '../../model/User';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import { Plugins, CameraResultType } from '@capacitor/core';
import {Router} from '@angular/router';
import {LogSignService} from '../../service/user/logSign/logSign.service';
const { Camera } = Plugins;
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-inscription',
  templateUrl: 'inscription.page.html',
  styleUrls: ['inscription.page.scss']
})

export class InscriptionPage implements  OnInit {
  cpassword:string="";
today:any;
mDate:any;
signForm: FormGroup;
base64:any;
public userPicture: string = null;
    jobs: any;


  constructor(public router:Router,
              private logSignService :LogSignService,
              public formBuilder: FormBuilder,
              public user:Users,
              private formbuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore
  )
  { this.jobs=this.logSignService.jobs;
    this.signForm=formBuilder.group(this.logSignService.patterns2);

  }

  async takePicture(): Promise<void> {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      this.base64 =profilePicture.base64String;
      //console.log(this.userPicture);
    } catch (error) {
      //console.error(error);
    }}
  ngOnInit() {
    this.today = moment().format("YYYY-MM-DD");

    let maxDate= new Date((new Date().getFullYear() - 18),
        new Date().getMonth(), new Date().getDate());
    this.mDate=moment(maxDate).format("YYYY-MM-DD");
  }

  async register() {

    if (this.user.password != this.cpassword) {
      alert("les mots de passe ne se matchent pas ");
    } else {
      try {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        this.user.createUser(this.user,res.user.uid,this.base64);

        this.logSignService.sendVerificationEmail(this.afAuth, this.user.email);
        this.logSignService.alertConnexion("Vous etes correctement enregistré veuillez activer vote compte en utilisant votre mail");
        this.router.navigate(['/home']);
      }

         catch (err) {
           this.logSignService.alertConnexion(err.message);
        if (err == "auth/invalid-email") {
          this.logSignService.alertConnexion("Email invalide pour créer un compte ")
        }
        else  if (err == "auth/weak-password") {
          this.logSignService.alertConnexion("le mot de passe n'est pas assez fort ")
        }


      }
    }
  }

}


