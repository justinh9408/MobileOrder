import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';

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

  constructor(public http: HttpClient, public storage: Storage) {
    this.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    this.options = { headers: this.headers,  withCredentials: true};
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
}
