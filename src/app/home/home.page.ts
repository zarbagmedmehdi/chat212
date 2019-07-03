import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import { Network } from '@ionic-native/network/ngx';
import {NetworkService} from '../helper/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    items: Observable<any[]>;

    isHidden = true;
    iconMargin1 = "90px";
    iconMargin2 = "0px";

    email: string="";
    password: string="";
    logForm: FormGroup;


    constructor( private networkService :NetworkService, private network: Network,db: AngularFirestore,
                       public afAuth :AngularFireAuth ,public formbuilder: FormBuilder) {
        this.logForm = formbuilder.group({

            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            password: ['', Validators.required],

        });
        networkService.networkCheck(this.network);
        this.items = db.collection('items').valueChanges();

    }
        onClickFuntion($event:MouseEvent)
        {
            this.isHidden == true ? this.isHidden = false : this.isHidden = true
            this.isHidden == true ? this.iconMargin1 = "90px" : this.iconMargin1 = "0px"
            this.isHidden == true ? this.iconMargin2 = "0px" : this.iconMargin2 = "90px"

        }
         async log()
        {
            const {email,password}=this
            try {
                const res=await this.afAuth.auth.signInWithEmailAndPassword(email,password);
            } catch (err){
                if (err="auth/user-not-found"){
                    alert("L’e-mail entré ne correspond à aucun compte. ")
                }
            }



        }




}

