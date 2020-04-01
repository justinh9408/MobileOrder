import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../service/order.service';
import { MenuService } from '../service/menu.service';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() category: any;
  @Input() rstId: any;

  orderItems = [];

  order: any;


  constructor(public orderService: OrderService, public menuService: MenuService,
              public storage: Storage, public alertController: AlertController,
              public toastController: ToastController) {
    storage.get('order').then(result => {
      if (result) {
        this.order = result;
      } else {
        storage.get('userId').then(userId => {
          this.order = {
            userId,
            items: []
          };
        });
      }
    });
   }

  ngOnInit() {}

  async orderItemPopup(item) {
    let value = 1;
    const existingItem = this.order.items.find(it => it.id === item.id);
    if (existingItem && existingItem.amount) {
      value = existingItem.amount;
    }
    const alert = await this.alertController.create({
      header: 'Amount',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Amount',
          value
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            item.amount = data.amount;
            this.checkRst(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async checkRst(item) {
    if (this.order.rstId && this.order.rstId !== this.rstId) {
      const alert = await this.alertController.create({
        header: 'You are adding an item from a different restaurant. Would you like to clear your current order?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: data => {
              console.log('Confirm Ok');
              this.order.items = [];
              this.orderItem(item);
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.orderItem(item);
    }
  }

  orderItem(item) {
    this.order.rstId = this.rstId;
    const existingItem = this.order.items.find(it => it.id === item.id);
    if (!existingItem) {
      this.order.items.push(item);
    } else {
      existingItem.amount = item.amount;
    }
    this.storage.set('order', this.order);
    this.presentToast('Item is added to your order successfully!');
  }

  submitOrder(){
    console.log("Submit Order to Restaurant Id: " + this.rstId);
    const data = {items: this.orderItems, type: 'order', rstId: this.rstId};
    this.orderService.submitOrder(data);
  }

  showOrder() {
    this.orderService.presentModal(this);
  }

  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }

}
