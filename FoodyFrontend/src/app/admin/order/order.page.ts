import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MenuService } from '../../service/menu.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {

  items;
  connection = null;
  constructor(public userService: UserService,public menuService: MenuService,public storage: Storage,
              private socket: Socket, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.storage.get('rstId').then((rstId) => {
      console.log("got rstId: " + rstId);
      this.connection = this.menuService.receiveOrder(rstId).subscribe(order => {
        console.log("Received order!");
        this.items = order["items"];
      });
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
