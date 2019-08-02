import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {AlertController, ToastController} from '@ionic/angular';
import {LogSignService} from '../service/user/logSign/logSign.service';
@Injectable()
export class Users {
    public id: string ;
    public nom: string ;
    public prenom: string ;
    public email: string ;
    public password: string ;
    public dateNaissance: Date ;
    public job:string ;
    public telephone: string ;
    public pays: string ;
    public userPicture: string;
    public description :string;
    constructor( public logSingService?:LogSignService,
    public toastController?:ToastController,
    public alert?: AlertController,
    public db?: AngularFirestore) {
        this.nom = "";
        this.prenom = "";
        this.email ="";
        this.id ="";
        this.password =null ;
        this.dateNaissance = null;
        this.job = "";
        this.pays = "";
        this.telephone ="";
        this.userPicture = "";
        this.description="";
    }


    public createUser(user: Users, id,base64) {
        user.toString();

        var downloadUrl = this.uploadUerPicture(id,base64);
        this.db.doc('users/' + id).set({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            id: id,
            password: user.password,
            dateNaissance: user.dateNaissance,
            job: user.job,
            pays: user.pays,
            telephone: user.telephone,
            description :"",
            userPicture: "https://firebasestorage.googleapis.com/v0/b/chat212-35009.appspot.com/o/userPhotos%2F" + id + "%2FprofilePicture.png?alt=media",
        })
        setTimeout(() => {
        }, 300);

    }

    public uploadUerPicture(id,base64) {
        if (base64 != null) {
            const storageRef = firebase.storage().ref(`/userPhotos/${id}/profilePicture.png`);
            return storageRef.putString(base64, 'base64', {contentType: 'image/png'})
                .then(() => {
                    return storageRef.getDownloadURL().then(function(url) {
                        return url.toString();
                    });});}}
    public deletePicture() {
        if (this.userPicture != null) {
            const storageRef = firebase.storage().ref(`/userPhotos/${this.id}/profilePicture.png`);
            return storageRef.delete();

                  }}

    public getUserById(id: string) {

        this.db.collection('users').doc(id).valueChanges().subscribe(cc => {
            this.cloneUser(cc);});
    }

    cloneUser(data: any) {
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.id = data.id;
        this.password = data.password;
        this.dateNaissance = data.dateNaissance;
        this.job = data.job;
        this.pays = data.pays;
        this.telephone = data.telephone;
        this.userPicture = data.userPicture;
        this.description=data.description
    }
    cloneUser2(data: any) {
        this.nom = data.get("nom");
        this.prenom = data.get("prenom");
        this.email = data.get("email");
        this.id = data.get("id");
        this.password = null;
        this.dateNaissance = data.get("dateNaissance");
        this.job = data.get("job");
        this.pays = data.get("pays");
        this.telephone =data.get("telephone");
        this.userPicture = data.get("userPicture");
        this.description=data.get("description");

    }

    viderUser() {
        this.nom = "";
        this.prenom ="";
        this.email = "";
        this.id ="";
        this.password = null;
        this.dateNaissance = null;
        this.job = "";
        this.pays = "";
        this.telephone ="";
        this.userPicture ="";
        this.description="";
    }



    getId() {return this.id;}
    public getNom() {return this.nom;}
    public getPrenom() {return this.prenom;}
    public getPassword() {return this.password;}
    public getEmail() {return this.email;}
    public getDateNaissance() {return this.dateNaissance;}
    public getTelephone() {return this.telephone;}
    public getPays() {return this.pays;}
    public getJob() {return this.job;}
    public toString() {
        //console.log("ccccccccccccc"+this.nom + " " +
         //   this.prenom + " " + this.email + " " + this.id + " " + this.password + " " + this.dateNaissance + " " + this.job + " " + this.pays + " " + this.userPicture + " " + this.telephone);
    }



    async showAlert(header: string, message: string) {
        const alert = await this.alert.create({header, message, buttons: ["ok"]})
        await alert.present();
    }




    public async setTelephone() {

        const alert = await this.alert.create({
            header: 'entrer votre nouveau telephone:',
            inputs: [{name: "telephone", type: 'text', placeholder: ''}, ],
            buttons: [{text: 'annuler', role: 'cancel', cssClass: 'secondary', handler: () => {}},
                {text: 'modifier', handler: datas => {
                        try {JSON.stringify(datas);
                        if (this.logSingService.validatePhone(datas)==true){
                           this.db.doc('users/' + this.id).update({
                                telephone: datas.telephone,}),
                                this.telephone=datas.telephone;
                            setTimeout(() => {}, 300);
                            this.logSingService.presentToast('tes modifications sont enregistrées');}
                        else {this.showAlert("","format telephone incorrect");}} catch (err) {this.showAlert("", err.message);}},}]})
        await alert.present();

    }
    public async setDescription() {

        const alert = await this.alert.create({
            header: 'votre nouvelle description',
            inputs: [{name: "description", type: 'text', placeholder: ''}, ],
            buttons: [{text: 'annuler', role: 'cancel', cssClass: 'secondary', handler: () => {}},
                {text: 'modifier', handler: datas => {
                        try {JSON.stringify(datas);
                                this.db.doc('users/' + this.id).update({
                                    description: datas.description,}),
                                    this.description=datas.description;
                                setTimeout(() => {}, 300);
                                this.logSingService.presentToast('tes modifications sont enregistrées');
                           } catch (err) {this.showAlert("", err.message);}},}]})
        await alert.present();

    }
    public async setJob() {
        let  options: Array<any>=[] ;

        for(let i=0; i< this.logSingService.jobs.length; i++) {
            options.push({ name : 'job', value:this.logSingService.jobs[i], label: this.logSingService.jobs[i], type: 'radio' });
        }
        const alert = await this.alert.create({

            header: 'Job',
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary',
                    handler: () => {
                    //console.log('Confirm Cancel');
                }
                }, {text: 'Ok',  handler: datas => {
                        try {
                            //console.log(JSON.stringify(datas));
                              this.db.doc('users/' + this.id).update({
                                    job: datas,}),
                                    this.job=datas;
                                setTimeout(() => {}, 300);
                                this.logSingService.presentToast('tes modifications sont enregistrées');
                        } catch (err) {this.showAlert("", err.message);}},}],
            inputs: options,
        })


        // Now we add the radio buttons

        await alert.present();
    }
    public async setPassword() {

        const alert = await this.alert.create({
            header: 'changer du mot de passe',
            inputs: [
                {name: "password", type: 'password', placeholder: ' old password '},
                {name: "nvPassword", type: 'password', placeholder: 'nv password'},
                {name: "nvPassword2", type: 'password', placeholder: 'répeter password'},
            ],
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary',
                    handler: () => {
                    //console.log('Confirm Cancel');
                }
                }, {text: 'Ok',  handler: datas => {
                        try {
                            if(this.logSingService.passwordVerification(this.password,datas.password,datas.nvPassword,datas.nvPassword2))
                            {this.logSingService.updatePassword(datas.nvPassword);
                                this.db.doc('users/' + this.id).update({
                                    password: datas.nvPassword,}),
                                setTimeout(() => {}, 300);
                                this.logSingService.presentToast('tes modifications sont enregistrées');
                            }


                        } catch (err) {this.showAlert("", err.message);}},}]})
        await alert.present();
    }
    public async setPays() {

        const alert = await this.alert.create({
            header: 'pays',
            inputs: [
                {name: 'pays', type: 'radio', label: 'Maroc', value: 'Maroc'},
                {name: 'pays', type: 'radio', label: 'France', value: 'France'},
                {name: 'pays', type: 'radio', label: 'Algérie', value: 'Algérie'},
                {name: 'pays', type: 'radio', label: 'Espagne', value: 'Espagne'},
            ],
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary',
                    handler: () => {
                    //console.log('Confirm Cancel');
                }
                }, {text: 'Ok',  handler: datas => {
                        try {
                            //console.log(JSON.stringify(datas));
                          this.db.doc('users/' + this.id).update({
                                pays: datas,}),
                                this.pays=datas;
                            setTimeout(() => {}, 300);
                            this.logSingService.presentToast('tes modifications sont enregistrées');


                        } catch (err) {this.showAlert("", err.message);}},}]})
        await alert.present();
    }


}


