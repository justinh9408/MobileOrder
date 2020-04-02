import { Component, Output } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @Output() orderInShow: any;
  orders: any;

  constructor(public orderService: OrderService, public storage: Storage) {
    this.storage.get('userId').then(userId => {
      orderService.getOrdersByUser(userId).subscribe(result => {
        this.orders = result;
        this.orders.forEach(ord => {
          ord.items = [];
        });
        this.orderInShow = this.orders[0];
        orderService.getOrderItemsByUser(userId).subscribe(items => {
          items.forEach(item => {
            const or = this.orders.find(ord => item.orderID === ord.id);
            if (or) {
              or.items.push(item);
            }
          });
        });
      });
    });
  }

  orderClick(order) {
    this.orderInShow = order;
  }

}
