import { Component, OnInit, Input, Output } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  @Input()order: any;

  constructor(public orderService: OrderService) {
   }

  ngOnInit() {}
}
