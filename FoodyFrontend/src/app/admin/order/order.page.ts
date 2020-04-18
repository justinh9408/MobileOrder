import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { OrderService } from '../../service/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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
              private socket: Socket, private activatedRoute: ActivatedRoute,
              public toastController: ToastController) {
                this.storage.get('rstId').then((rstId) => {
                  this.connection = this.orderService.receiveOrder(rstId).subscribe(order => {
                    order['class'] = 'new-order';
                    this.orders.forEach(ord => {
                      ord.selectedColor = 'tertiary';
                    });
                    order['selectedColor'] = 'secondary';
                    this.orders.unshift(order);
                    this.orderInShow = order;
                  });

                  orderService.getOrdersByRst(rstId).subscribe(result => {
                    this.orders = result;
                    this.orders.forEach((ord, index) => {
                      ord.items = [];
                      if (index === 0) {
                        ord.selectedColor = 'secondary';
                      } else {
                        ord.selectedColor = 'tertiary';
                      }
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
    order.class = '';
    this.orders.forEach(ord => {
      ord.selectedColor = 'tertiary';
    });
    order.selectedColor = 'secondary';
    this.orderInShow = order;
    console.log(order);
  }

  updateOrderStatus() {
    this.orderService.updateOrderStatus(this.orderInShow.id, 2).subscribe(result => {
      if (result) {
        this.orderInShow.status = 'done';
        this.presentToast('Order Status Updated!');
        const userId = this.orderInShow.userID ? this.orderInShow.userID : this.orderInShow.userId;
        const data = {orderId: this.orderInShow.id, userId, status: 'done'};
        console.log('update order: ', data);
        this.orderService.finishOrder(data);
      }
    });
  }

  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }


}
