import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  hostName = 'https://ionicdemobackend.azurewebsites.net';
  private url = 'http://localhost:3000'; 
  private socket = io(this.url);
 
  headers = new HttpHeaders().set(
    'Content-type',
    'application/json'
  );

  options: any;

  constructor(public http: HttpClient, public storage: Storage) {
    if (window.location.href.indexOf('localhost') > 0) {
      this.hostName = 'http://localhost:3000';
    }
    this.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    this.options = { headers: this.headers,  withCredentials: true};
  }

  // customer submit order to rst
  submitOrder(data){

    this.socket.emit('submitOrder', data);  
  }

  // rst owner recieve real-time order
  receiveOrder(rstId) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
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

  sendMessage(data){
    this.socket.emit('add-message', data);  
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);  
      });
      return () => {
        this.socket.disconnect();
      }; 
    })   
    return observable;
  } 

  getCategories(rstId): Observable<any> {
    return this.http.get(this.hostName + '/categories?rstId=' + rstId);
  }

  createCategories(item): Observable<any> {
    return this.http.post(this.hostName + '/categories', item);
  }

  updateCategories(id, item): Observable<any> {
    return this.http.post(this.hostName + '/categories/' + id, item);
  }

  deleteCategories(id): Observable<any> {
    return this.http.delete(this.hostName + '/categories/' + id);
  }

  getMenuItem(id): Observable<any> {
    return this.http.get(this.hostName + '/menuitems/' + id);
  }

  createMenuItem(item): Observable<any> {
    return this.http.post(this.hostName + '/menuitems', item);
  }

  updateMenuItem(id, item): Observable<any> {
    return this.http.post(this.hostName + '/menuitems/' + id, item);
  }

  deleteMenuItem(id): Observable<any> {
    return this.http.delete(this.hostName + '/menuitems/' + id);
  }

  getCategoriesWithItem(rstId): Observable<any> {
    return this.http.get(this.hostName + '/categorieswithitem/' + rstId);
  }

  uploadFile(file, id): Observable<any> {
    return this.http.post(this.hostName + '/menuitemimage/' + id, file);
  }

}
