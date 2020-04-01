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
  orderNum = 1;
  items: any;
  connection = null;


  orders = [];

  orderItem = {
    name : null,
    items : []
  }

  orderBill = 0;

  constructor(public userService: UserService,public orderService: OrderService,public storage: Storage,
              private socket: Socket, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit() {

    this.storage.get('rstId').then((rstId) => {
      this.connection = this.orderService.receiveOrder(rstId).subscribe(order => {
        // this.items = order["items"];
        const orderName = "order " + this.orderNum;
        this.orderNum = this.orderNum + 1;
        order = {name : orderName, items : order["items"]}
        this.orders.push(order);
      });

      // id: 1  
      // orderID: 1 *
      // amount: 2
      // name: "Kobe"
      // price: 10
      this.orderService.getOrderItemsByRst(rstId).subscribe(orderItems => {
        const grouped = this.groupBy(orderItems, oi => oi.orderID);
        for(let orderId of grouped.keys()){
          this.orderBill = 0;
          const items = [];

          grouped.get(orderId).forEach(itm => {
            this.orderBill = this.orderBill + itm.amount * itm.price;
            items.push({name: itm.name, amount:itm.amount})
          });
          
          const order = {name : orderId, items : items, totalPrice: this.orderBill}
          this.orders.push(order);
        }
      });

    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

// select one specific order
  orderClick(order){
    this.orderInShow = order;
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }


}
