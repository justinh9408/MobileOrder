import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';
import { ModalController, ToastController } from '@ionic/angular';
import { OrderModalPage } from '../order-modal/order-modal.page';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  hostName = 'http://localhost:3000';
  private socket = io(this.hostName);

  headers = new HttpHeaders().set(
    'Content-type',
    'application/json'
  );

  options: any;

  constructor(public http: HttpClient, public storage: Storage,
              public modalController: ModalController, public toastController: ToastController) {
    this.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    this.options = { headers: this.headers,  withCredentials: true};
  }

  //rst finish order
  finishOrder(data){
    this.socket.emit('changeOrderStatus', data);
  }

  //update order status in customer side
  orderStatusUpdate(userId){
    let observable = new Observable(observer => {
      this.socket = io(this.hostName);
      let orderEvent = 'orderStatusUpdate-' + userId;
      this.socket.on(orderEvent, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // customer submit order to rst
  submitOrder(data) {
    
    this.socket.emit('submitOrder', data);
  }

  // rst owner recieve real-time order
  receiveOrder(rstId) {
    let observable = new Observable(observer => {
      this.socket = io(this.hostName);
      let orderEvent = 'receiveOrder-' + rstId;
      this.socket.on(orderEvent, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  async presentModal(ref) {
    const modal = await this.modalController.create({
      component: OrderModalPage,
      componentProps: {
        hostName: this.hostName
      }
    });
    modal.onDidDismiss().then(data => {
      this.storage.get('order').then(order => {
        if (ref) {
          ref.order = order;
        }
        console.log(data);
        if (data.data.submit) {
          // submit
          this.createOrder(order).subscribe(result => {
            console.log(result);
            if (result && result.length > 0) {
              order.id = result[0].id;
              order.userName = result[0].userName;
              order.status = 'sent';
              order.created = new Date().toLocaleString();
              this.submitOrder(order);
              if (ref) {
                ref.order = {
                  userId: order.userId,
                  items: []
                };
              }
              this.storage.remove('order').then(async result => {
                const toast = await this.toastController.create({
                  message: 'Order is submitted!',
                  duration: 2000
                });
                toast.present();
              });
            }
          });

        }
      });
    });
    return await modal.present();
  }

  getOrdersByRst(rstId): Observable<any> {
    return this.http.get(this.hostName + '/ordersByRst/' + rstId);
  }

  getOrderItemsByRst(rstId): Observable<any> {
    return this.http.get(this.hostName + '/orderItemsByRst/' + rstId);
  }

  getOrdersByUser(userId): Observable<any> {

    return this.http.get(this.hostName + '/ordersByUser/' + userId);
  }

  getOrderItemsByUser(userId): Observable<any> {
    return this.http.get(this.hostName + '/orderItemsByUser/' + userId);
  }

  createOrder(item): Observable<any> {
    return this.http.post(this.hostName + '/orders', item);
  }

  updateOrderStatus(orderId, statusId): Observable<any> {
    return this.http.get(this.hostName + '/updateOrderStatus/' + orderId + '/' + statusId);
  }
}
