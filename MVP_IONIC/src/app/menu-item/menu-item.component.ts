import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() category: any;

  orderItems = []


  constructor(public menuService: MenuService) { }

  orderItem(item){
  	this.orderItems.push(item);

  }

  submitOrder(){
  	const data = {items: this.orderItems, type: 'order'};
    this.menuService.sendMessage(data);
  }

  ngOnInit() {}

}
