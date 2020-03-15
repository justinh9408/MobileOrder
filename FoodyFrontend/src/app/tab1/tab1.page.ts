import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../service/user.service';

import { Socket } from 'ng-socket-io';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
	// tslint:disable:indent
	msg = 'df';
	msgs = [];
 	connection;
 	id = 1;
  constructor(public userService: UserService, private socket: Socket,
              private router: Router, private route: ActivatedRoute) {


  }


  send() {
    const data = {text: this.msg, type: 'new'};
    this.userService.sendMessage(data);
    this.msg = '';
  }

  ngOnInit() {
    this.connection = this.userService.getMessages().subscribe(message => {
        this.msgs.push(message);
    });
  }

  ngOnDestroy() {
   this.connection.unsubscribe();
 }
}
