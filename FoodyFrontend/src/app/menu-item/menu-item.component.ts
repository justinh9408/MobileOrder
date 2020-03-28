import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() category: any;
  @Input() rstId: any;

  orderItems = []


  constructor(public menuService: MenuService) { }

  orderItem(item){
  	this.orderItems.push(item);

  }

  submitOrder(){
    console.log("Submit Order to Restaurant Id: " + this.rstId);
  	const data = {items: this.orderItems, type: 'order', rstId: this.rstId};
    this.menuService.submitOrder(data);
  }

  ngOnInit() {}

}
