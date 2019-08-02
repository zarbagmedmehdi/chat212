import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {NetworkStatus, PluginListenerHandle, Plugins} from '@capacitor/core';
import {Users} from '../../model/User';
import {User} from 'firebase';
import {LogSignService} from '../../service/user/logSign/logSign.service';

const { Network } = Plugins;


import {Platform, ToastController} from '@ionic/angular';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    items: Observable<any[]>;
    isHidden = true;
    iconMargin1 = "90px";
    iconMargin2 = "0px";
    internetConnection : boolean;
    email: string="";
    password: string="";
    logForm: FormGroup;
  //  networkStatus: NetworkStatus;
    //networkListener: PluginListenerHandle;

    constructor( private platform: Platform
                 , private fcm: NotificationService,
        private toastCtrl: ToastController,
        private logSignService:LogSignService,
        public db: AngularFirestore,
        public cUser:Users,
        public router:Router,
        public afAuth :AngularFireAuth ,
        public formBuilder: FormBuilder)
    {
        this.logForm=formBuilder.group(this.logSignService.patterns);
        this.email= "";
        this.password ="";
    }
        onClickFuntion($event:MouseEvent){

            //console.log("onClickFunction");
         this.isHidden == true ? this.isHidden = false : this.isHidden = true;
            this.isHidden == true ? this.iconMargin1 = "90px" : this.iconMargin1 = "0px";
            this.isHidden == true ? this.iconMargin2 = "0px" : this.iconMargin2 = "90px";
         //  this.cnxService. manageInterface(this.isHidden,this.iconMargin1,this.iconMargin2);
        }

    async ngOnInit() {
        this.email= "";
        this.password ="";
        console.log("cc");

}

         async log()
        {const {email, password} = this
                try {const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
                    if (res.user) {
                        if(res.user.emailVerified==true)    {
                            await  this.cUser.getUserById(res.user.uid);
                            this.router.navigate(['/tab']);
                            this.logSignService.presentToast('      Bienvenue    ' );
                        }
                        else  this.logSignService.alertConnexion("you should verify your email first");
                        this.router.navigate(['/tab/profile'],{queryParams:{user:this.afAuth.auth.currentUser.uid}});

                    }
                } catch (err) {
                    //console.log(err);
                    this.logSignService.alertConnexion(err.message);
                }
            }









}

