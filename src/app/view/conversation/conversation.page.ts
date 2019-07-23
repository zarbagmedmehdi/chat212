import { Component, OnInit } from '@angular/core';
import {jobs} from '@angular-devkit/core/node/experimental';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
public messages:string[]=[];
  constructor() { }

  ngOnInit() {
   this.messages=["cc","bb"];
  }

}
