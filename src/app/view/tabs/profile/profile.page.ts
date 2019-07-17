import {Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Users} from '../../../model/User';
import {BrowserModule} from '@angular/platform-browser'
import {AngularFireAuth} from '@angular/fire/auth';
import {Camera, CameraResultType} from '@capacitor/core';
import {Router} from '@angular/router';
import {AlertController, IonImg} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
bol :boolean;
userPicture:string="";
  constructor( public router:Router,
      public user :Users, public afAuth :AngularFireAuth ,public alert :AlertController ) {}
  telephoneEvent($event){
      this.user.setTelephone();
    }
    jobEvent($event){
        this.user.setJob();
    }
    paysEvent($event){
   // console.log("dskjlfj"+this.user.userPicture);
        this.user.setPays();
    }
  changePassword($event){

    this.user.setPassword();
  }

  async takePicture($event): Promise<void> {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
        if(profilePicture!=null) {
        //  let cc="https://firebasestorage.googleapis.com/v0/b/chat212-35009.appspot.com/o/userPhotos%2F" + this.user.id
          //    + "%2FprofilePicture.png?alt=media?random=" + Math.random();
      let cc="https://js.pngtree.com/v3/images/home/paradrop.png";
      this.user.deletePicture();
       this.user.uploadUerPicture(this.user.id,profilePicture.base64String);
          this.user.getUserById(this.afAuth.auth.currentUser.uid);
          console.log(cc);
          this.user.userPicture  ="";
        }
    } catch (error) {
        console.error(error);
      }
      finally {
        console.log("done");

      }
    }

 async SignOut($event) {
    console.log("cc");
    const alert = await this.alert.create({
      message: 'Vous voulez se <strong>deconnectez</strong>',
      buttons: [{text: 'non', role: 'cancel', cssClass: 'secondary',},
        {text: 'oui',
          handler: () => {
            return this.afAuth.auth.signOut().then(() => {
              this.router.navigate(['/home']) .then(() => {
                window.location.reload();
              });
            })
          }
        }
      ]
    });
    alert.present();

  }


  ngOnInit() {
    this.user.getUserById(this.afAuth.auth.currentUser.uid);
    this.user.toString();
    this.bol=true;
  }

}
