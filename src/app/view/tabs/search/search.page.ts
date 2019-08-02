import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController,  IonSelect} from '@ionic/angular';
import {SearchService} from '../../../service/user/search/search.service';
import {Users} from '../../../model/User';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {LogSignService} from '../../../service/user/logSign/logSign.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    @ViewChild('select') select: IonSelect;

    public users:  Users[]=[];

    label: string = '      ';
    pays: string = '';
    nom: string = '';
    prenom: string = '';
    bb: number = 0;

    constructor( public logSingService:LogSignService,
        public afAuth: AngularFireAuth,private router: Router, private searchService: SearchService, private alert: AlertController) {

    }

    ngOnInit() {

    }

    onSelect() {
        if (this.select.value == 0) {
            //console.log(1);
            this.fullNameSearch();
        }
        if (this.select.value == 1) {
            //console.log(1);
            this.textSearch('nom', 1);
        }
        if (this.select.value == 2) {
            //console.log(2);
            this.textSearch('prenom', 2);
        }
        if (this.select.value == 3) {
            //console.log(3);
            this.paysSearch();
        }
        if (this.select.value == 4) {
            //console.log(3);
           this.jobSearch();
        }
        this.select.value = null;
    }

    async paysSearch() {
        const alert = await this.alert.create({
            header: 'pays', inputs: [
                {name: 'pays', type: 'radio', label: 'Maroc', value: 'Maroc'},
                {name: 'pays', type: 'radio', label: 'France', value: 'France'},
                {name: 'pays', type: 'radio', label: 'Algérie', value: 'Algérie'},
                {name: 'pays', type: 'radio', label: 'Espagne', value: 'Espagne'},],
            buttons: [{
                text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {
                    return null;
                }
            },
                {
                    text: 'Ok', handler: datas => {
                        this.pays = datas.toString();
                        this.label = 'Resultats  pour pays: "' + this.pays + '"';
                        //this.users = new Array<Users>();

                       this.users = this.searchService.getUsers('pays', this.pays);
                       //console.log(this.users);
                    }
                }]
        });
        await alert.present();
    }

    async textSearch(header: string, variable) {
        const alert = await this.alert.create({
            header: header,
            inputs: [{name: 'text', type: 'text',},],
            buttons: [
                {
                    text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {
                        return null;
                    }
                },
                {
                    text: 'Ok', handler: datas => {
                        variable == 1 ? this.nom = datas.text : this.prenom = datas.text;
                        variable == 1 ? this.label = 'Resultats  pour ' + header + ': "' + this.nom + '"'
                            : this.label = 'Resultats  pour ' + header + ': "' + this.prenom + '"';
                      //this.users = new Array<Users>();
                       this.users = this.searchService.getUsers(header, datas.text);
                    }
                }]
        });
        await alert.present();

    }
    async fullNameSearch() {
        const alert = await this.alert.create({
            header: "full Name",
            inputs: [{placeholder: "nom" ,name: 'nom', type: 'text',},
                {placeholder: "prenom" ,name: 'prenom', type: 'text',}
            ],
            buttons: [
                {
                    text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {
                        return null;
                    }
                },
                {
                    text: 'Ok', handler: datas => {
                        this.label = 'Resultats  pour  : "' + datas.nom+ " "+ datas.prenom;
                        //this.users = new Array<Users>();
                        this.users = this.searchService.getUsersByFullName(datas.nom, datas.prenom);
                    }
                }]
        });
        await alert.present();

    }


    public async jobSearch() {
        let options: Array<any> = [];
        for (let i = 0; i < this.logSingService.jobs.length; i++) {
            options.push({name: 'job', value: this.logSingService.jobs[i], label: this.logSingService.jobs[i], type: 'radio'});
        }
        const alert = await this.alert.create({

            header: 'Job',
            buttons: [
                {
                    text: 'Cancel', role: 'cancel', cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok', handler: datas => {
                        try {

                            this.label = 'Resultats  pour Job: "' +   datas.toString() + '"';

                            this.users = this.searchService.getUsers('job',   datas.toString());
                        } catch (err) {
                        }
                    },
                }],
            inputs: options,
        })
        await alert.present();

    }
        goToProfile(user: Users) {
        this.router.navigate(['his-profile', user.id]);
    }


}



