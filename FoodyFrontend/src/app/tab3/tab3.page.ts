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
  today = new Date();

  constructor(public orderService: OrderService, public storage: Storage) {
    this.storage.get('userId').then(userId => {
      orderService.getOrdersByUser(userId).subscribe(result => {
        this.orders = result;
        this.orders.forEach((ord, index) => {
          ord.items = [];
          if (index === 0) {
            ord.selectedColor = 'secondary';
          } else {
            ord.selectedColor = 'tertiary';
          }
        });
        orderService.getOrderItemsByUser(userId).subscribe(items => {
          for (const item of items) {
            const or = this.orders.find(ord => item.orderID === ord.id);
            if (or) {
              or.items.push(item);
            }
          }
          this.orderInShow = this.orders[0];
        });

        orderService.orderStatusUpdate(userId).subscribe(data => {
          console.log("orderStatusUpdate: " + data["status"] + data["orderId"])
          for(const ord of result){
            if (ord.id == data["orderId"]) {
              ord.status = data["status"];
            }
          }
        });
      });

    });
  }

  orderClick(order) {
    this.orders.forEach(ord => {
      ord.selectedColor = 'tertiary';
    });
    order.selectedColor = 'secondary';
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
