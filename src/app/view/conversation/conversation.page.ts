import { Users} from '../../model/User';
import {Messages} from '../../model/Message';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConversationService} from '../../service/chat/conversation.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Conversations} from '../../model/Conversation';
import {Camera, CameraResultType} from '@capacitor/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import {AlertController} from '@ionic/angular';
@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage {
    private conversation: Conversations = new Conversations();
    private friend: Users = new Users();
    private myProfile: Users = new Users();
    private messages: Messages[] = [];
    @ViewChild('content') private content: any;

    private input: string = '';
    private emeteur: string;
    private cc = '1';
    private bb = '2';

    constructor(
        private alertController: AlertController,
        private iab: InAppBrowser,
        private geolocation: Geolocation,
        private afAuth: AngularFireAuth,
        private cns: ConversationService,
        private route: ActivatedRoute) {
    }

    ionViewWillEnter() {
        this.dd();

    }

    doScrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 900);
    }

    dd() {
        this.emeteur = this.afAuth.auth.currentUser.uid;
        this.route.params.subscribe(async params => {
            this.cns.getConversationById(params['id'], (conversation: Conversations) => {
                this.cns.getMessages(conversation.id, (messages) => {
                    this.messages = messages;
                    this.conversation.id = conversation.id;
                    if (conversation.interlocuteur1 == this.afAuth.auth.currentUser.uid) {
                        this.friend = this.cns.getUserById(conversation.interlocuteur2);
                    } else {
                        this.friend = this.cns.getUserById(conversation.interlocuteur1);
                    }

                });

            });
            this.doScrollToBottom();

        });

    }




    doSend() {
        if (this.input.length > 0) {

            this.prepareMessage('text', this.input, () => {
                this.input = '';

            });

        }
    }


    prepareMessage(type, contenu, callback) {
        let message: Messages = new Messages();

        message.emeteur = this.emeteur;
        message.conversation = this.conversation.id;
        message.contenu = contenu;
        message.typeContenu = type;
        // console.log("before \n");
        // console.log(message)
        this.cns.createMessage(message, () => {
            {
                {
                }
            }//this.messages.push(message);
            let find = this.messages.find((seach) => {
                return (seach.dateEnvoi.getTime()) == (message.dateEnvoi.getTime()) && seach.contenu == message.contenu;


            });
            callback();
        });

    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendPhoto() {
        try {
            const picture = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
            });
            if (picture.base64String != "") {
                console.log(picture.base64String);
                this.uploadUerPicture(this.conversation.id, this.afAuth.auth.currentUser.uid, picture.base64String)
            } else console.log("not taken");
            //console.log(this.userPicture);
        } catch (error) {
            //console.error(error);
        }
    }

    public uploadUerPicture(idConversation, idEmetteur, base64) {
        if (base64 != null) {
            let emeteur = this.emeteur;
            let conversation = this.conversation.id;
            let cnss = this.cns;
            try {
                const date: Date = new Date();
                const storageRef = firebase.storage().ref(`/conversations/${idConversation}/${idEmetteur}/${date.toString()}`);

                return storageRef.putString(base64, 'base64', {contentType: 'image/png'})
                    .then(() => {
                        return storageRef.getDownloadURL().then(function(url) {

                            let message: Messages = new Messages();
                            message.emeteur = emeteur;
                            message.conversation = conversation;
                            message.contenu = url.toString();
                            message.typeContenu = 'photo';

                            cnss.createMessage(message, () => {
                                {
                                    {
                                    }
                                }
                            });
                        });
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }

    sendLocalisation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            const obj: any = {
                "latitude": resp.coords.latitude,
                "longitude": resp.coords.longitude,
            }
            var myJSON: string = JSON.stringify(obj);
            this.prepareMessage('geo', myJSON, () => {
                this.doScrollToBottom()
            });


        }).catch((error) => {
            console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {

        });
    }

    goToLocalisation(string) {
        const data: JSON = JSON.parse(string);
        alert(data['latitude']);
        const browser = this.iab.create('https://www.google.com/maps/@' + data['latitude'] + ',' + data['longitude'],
            '_self', {location: 'no'});

    }

    async presentAlert(url) {
         let message=' <img src='+url+'></img>'
        const alert = await this.alertController.create({
            message: message,
        });
        await alert.present();

    }
}


