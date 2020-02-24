import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MenuService } from '../../service/menu.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {

  items;
  connection = null;
  constructor(public userService: UserService,public menuService: MenuService,
              private socket: Socket, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.connection = this.menuService.getMessages().subscribe(order => {
      this.items = order["items"];
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
