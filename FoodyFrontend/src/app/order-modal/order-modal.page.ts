import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.page.html',
  styleUrls: ['./order-modal.page.scss'],
})
export class OrderModalPage implements OnInit {

  @Input() hostName: any;
  order: any;
  note: string;

  constructor(public modalCtrl: ModalController, public storage: Storage, public orderServe : OrderService,
              public alertController: AlertController, public toastController: ToastController) {
    storage.get('order').then(result => {
      this.order = result;
      console.log(this.order);
      if (this.order && this.order.note) {
        this.note = this.order.note;
      }
    });
  }

  ngOnInit() {
  }

  orderUpdate() {
    console.log('update');
    this.storage.set('order', this.order);
  }

  submit() {
    this.modalCtrl.dismiss({
      submit: true
    });
    console.log("submit Order");
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      submit: false
    });
  }

  async itemDeleteAlert(itemId) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to remove this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: data => {
            this.itemDelete(itemId);
          }
        }
      ]
    });
    await alert.present();
  }

  itemDelete(itemId) {
    this.presentToast('Item is removed successfully!');
    const index = this.order.items.findIndex(item => item.id === itemId);
    if (index >= 0) {
      this.order.items.splice(index, 1);
    }
    this.orderUpdate();
  }

  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }

  increment(item) {
    item.amount ++;
    this.orderUpdate();
  }

  decrement(item) {
    item.amount --;
    this.orderUpdate();
  }

  noteUpdate() {
    console.log('noteupdate');
    this.order.note = this.note;
    this.orderUpdate();
  }

}
