import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../../model/User';
import {CallNumber} from '@ionic-native/call-number';

@Component({
  selector: 'app-his-profile',
  templateUrl: './his-profile.page.html',
  styleUrls: ['./his-profile.page.scss'],
})
export class HisProfilePage implements OnInit {
  private getRoute: any;

  constructor(   private cUser :Users,private  route :ActivatedRoute) {
  }

  ngOnInit() {
    console.log('0');
    this.getRoute = this.route.params.subscribe(params => {
      console.log('1');

      let id:string= params['id'];
      console.log('2');

      console.log("hahwa mli wssl"+id);
      console.log('3');


      this.cUser.getUserById(id);
      console.log('4');

    });
  }





}
