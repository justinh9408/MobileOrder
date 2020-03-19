import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private url = 'http://localhost:3000'; 
   private socket = io(this.url);
  hostName = 'https://ionicdemobackend.azurewebsites.net';

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


  getUsers(): Observable<any> {
    return this.http.get(this.hostName + '/users');
  }
  getUser(id): Observable<any> {
    return this.http.get(this.hostName + '/users/' + id);
  }

  updateUser(id, item): Observable<any> {
    return this.http.post(this.hostName + '/users/' + id, item);
  }

  register(item): Observable<any> {
    return this.http.post(this.hostName + '/users', item);
  }

  login(item): Observable<any> {
    return this.http.post(this.hostName + '/login', item);
  }

  setLoginStorage(user) {
    if (user.name) {
      this.storage.set('userName', user.name);
    }
    if (user.id) {
      this.storage.set('userId', user.id).then(result => {
        window.location.href = '/';
      });
    }
  }

  logout() {
    this.storage.remove('userName');
    this.storage.remove('userId');
  }

  checkLoginStatus() {
    this.storage.get('userId').then(result => {
      // tslint:disable-next-line:radix
      if (result && parseInt(result) > 0) {
        console.log('login', result);
      } else {
        console.log('not log in', result);
        window.location.href = '/log-in';
      }
    });
  }
}