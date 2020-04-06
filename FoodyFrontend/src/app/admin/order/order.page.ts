import { Component, OnInit, OnDestroy, Output } from '@angular/core';
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

  @Output() orderInShow: any;
  connection = null;
  orders = [];
  today = new Date();

  constructor(public userService: UserService,public orderService: OrderService,public storage: Storage,
              private socket: Socket, private activatedRoute: ActivatedRoute) { 
                this.storage.get('rstId').then((rstId) => {
                  this.connection = this.orderService.receiveOrder(rstId).subscribe(order => {
                    this.orders.push(order);
                  });

                  orderService.getOrdersByRst(rstId).subscribe(result => {
                    this.orders = result;
                    this.orders.forEach(ord => {
                      ord.items = [];
                    });
                    orderService.getOrderItemsByRst(rstId).subscribe(items => {
                      for (const item of items) {
                        const or = this.orders.find(ord => item.orderID === ord.id);
                        if (or) {
                          or.items.push(item);
                        }
                      }
                      this.orderInShow = this.orders[0];
                    });
                  });
                });

  }

  ngOnInit() {


  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

// select one specific order
  orderClick(order){
    this.orderInShow = order;
  }

  getTimeStamp(timeStr) {
    const orderDate = new Date(timeStr);
    if (orderDate.toLocaleDateString() === this.today.toLocaleDateString()) {
      return orderDate.toLocaleTimeString();
    } else {
      return orderDate.toLocaleDateString();
    }
  }


}
