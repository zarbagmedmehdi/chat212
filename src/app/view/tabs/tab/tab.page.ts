import { Component, OnInit } from '@angular/core';
import {Users} from '../../../model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  constructor(
      private rt: Router) { }

  ngOnInit() {
    //console.log("tabPage");
  }
    toConversations(){

        this.rt.navigate(['/conversations']);
      }

    toProfile(){
    this.rt.navigate(['/profile']);
  }


    toSearch(){
    this.rt.navigate(['/search']);
  }



}
