import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit, OnChanges {

  @Input()order: any;

  subtotal: number;
  gst: number;
  totalPrice: number;

  constructor(public orderService: OrderService) {
    
   }

  ngOnInit() {
    this.calculateTotalPrice();
  }

  ngOnChanges() {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    console.log('calculateTotalPrice', this.order);
    this.subtotal = 0;
    this.gst = 0;
    this.totalPrice = 0;
    if (this.order) {
      console.log('calculateTotalPrice', this.order.items);
      for (const item of this.order.items) {
        console.log('calculateTotalPrice', item);
        this.subtotal += item.amount * item.price;
      }
      this.gst = this.subtotal * 0.05;
      this.totalPrice = this.subtotal + this.gst;
    }
  }

  dateStringWrap(date) {
    return new Date(date).toLocaleString();
  }
}
