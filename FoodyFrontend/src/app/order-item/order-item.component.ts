import { Component, OnInit, Input, Output } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  order = {
    id: -1,
    userId: '',
    name: '',
    item: '',
  }
  orders = null;

  @Output() orderInShow: any;
  @Output() orderId: number;
  @Output() userId: number;

  constructor(public orderService: OrderService) {
    orderService.getOrdersByUser(this.orderId).subscribe(ord =>{
      this.orders = ord;
      this.orders.forEach(ord =>{
        ord.items = [];
      });
      this.orderInShow = this.order[0];
      orderService.getOrderItemsByUser(this.orderId).subscribe(items =>{
        items.forEach(item => {
          const or = this.orders.find(ord => item.ordID === ord.id);
          if(or){
            or.items.push(item);
          }
        });
      });
    });
   }

  ngOnInit() {}

  orderClick(order) {
    this.orderInShow = order;
  }

}
