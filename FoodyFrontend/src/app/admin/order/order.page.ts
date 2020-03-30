import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { OrderService } from '../../service/order.service';
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
  constructor(public userService: UserService,public orderService: OrderService,public storage: Storage,
              private socket: Socket, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.storage.get('rstId').then((rstId) => {
      console.log("got rstId: " + rstId);
      this.connection = this.orderService.receiveOrder(rstId).subscribe(order => {
        console.log("Received order!");
        this.items = order["items"];
      });
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
