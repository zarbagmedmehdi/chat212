import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {CnxNetworkService} from '../helper/cnx-network.service';
import {AlertController} from '@ionic/angular';
import {showRuleCrashWarning} from 'tslint/lib/error';
import {stringify} from 'querystring';
@Injectable()
export class Users {
    public id: string = "";
    public nom: string = "";
    public prenom: string = "";
    public email: string = "";
    public password: string = "";
    public dateNaissance: Date = new Date();
    public situationFamilliale: string = "";
    public telephone: string = "";
    public pays: string = "";
    public userPicture: string = "";

    constructor(public alert: AlertController, public db: AngularFirestore) {
    }

    public createUser(user: Users, id) {
        user.toString();
        var downloadUrl = this.uploadUerPicture(user, id);
        this.db.doc('users/' + id).set({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            id: id,
            password: user.password,
            dateNaissance: user.dateNaissance,
            situationFamilliale: user.situationFamilliale,
            pays: user.pays,
            telephone: user.telephone,
            userPicture: "https://firebasestorage.googleapis.com/v0/b/chat212-35009.appspot.com/o/userPhotos%2F" + id + "%2FprofilePicture.png?alt=media",
        })
        setTimeout(() => {
        }, 300);

    }

    public uploadUerPicture(user: Users, id) {
        if (this.userPicture != null) {
            const storageRef = firebase
                .storage()
                .ref(`/userPhotos/${id}/profilePicture.png`);

            return storageRef
                .putString(this.userPicture, 'base64', {contentType: 'image/png'})
                .then(() => {
                    return storageRef.getDownloadURL().then(function(url) {
                        console.log("kkkkkkkkkkkkkk kkkkkkkkk" + url);
                        return url;

                    });
                });

        }
    }

    public getUserById(id: string) {
        this.db.collection('users').doc(id).valueChanges().subscribe(cc => {
            this.cloneUser(cc);
console.log("ha id f get UserBy Id"+this.id);
        });
        setTimeout(() => {
        }, 300);
    }

    cloneUser(data: any) {
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.id = data.id;
        this.password = data.password;
        this.dateNaissance = data.dateNaissance;
        this.situationFamilliale = data.situationFamilliale;
        this.pays = data.pays;
        this.telephone = data.telephone;
        this.userPicture = data.userPicture;

    }


    getId() {
        return this.id;
    }

    public getNom() {
        return this.nom;
    }

    public getPrenom() {
        return this.prenom;
    }

    public getPassword() {
        return this.password;
    }

    public getEmail() {
        return this.email;
    }

    public getDateNaissance() {
        return this.dateNaissance;
    }

    public getTelephone() {
        return this.telephone;
    }

    public getPays() {
        return this.pays;
    }

    public getSituationFamilliale() {
        return this.situationFamilliale;
    }

    public toString() {
        console.log(this.nom + " " +
            this.prenom + " " + this.email + " " + this.id + " " + this.password + " " + this.dateNaissance + " " + this.situationFamilliale + " " + this.pays + " " + this.userPicture + " " + this.telephone);
    }



    async showAlert(header: string, message: string) {
        const alert = await this.alert.create({
            header, message, buttons: ["ok"]
        })
        await alert.present();
    }

    public async setTelephone() {
        console.log("2");
console.log("ha tel l9dim"+this.telephone);
console.log("ha id"+this.id)
        const alert = await this.alert.create({
            header: 'entrer New value :telephone',
            inputs: [
                {name: "telephone", type: 'text', placeholder: ''},
            ],
            buttons: [
                {text: 'annuler', role: 'cancel', cssClass: 'secondary', handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'modifier', handler: datas => {
                        try {

                            JSON.stringify(datas);
                            this.db.doc('users/' + this.id).update({
                                telephone: datas.telephone,
                            }),
                                this.telephone=datas.telephone;
                            setTimeout(() => {
                            }, 300);
                        } catch (err) {
                            this.showAlert("", err.message);
                        }

                    },
                }
                    ]
        })
        await alert.present();

        console.log("4");

    }

}


