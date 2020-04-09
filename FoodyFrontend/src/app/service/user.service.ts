import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  sendMessage(data){
    this.socket.emit('add-message', data);
  }
  getMessages() {
    let observable = new Observable(observer => {
    this.socket.on('message', (data) => {
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
    });
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
    return this.http.post(this.hostName + '/usrlogin', item);
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
    this.storage.remove('userName').then(result1 => {
      this.storage.remove('userId').then(result2 => {
        this.storage.remove('order').then(result3 => {
          window.location.href = '/log-in/0';
        });
      });
    });

  }

  checkLoginStatus() {
    this.storage.get('userId').then(result => {
      // tslint:disable-next-line:radix
      if (result && parseInt(result) > 0) {
        console.log('login', result);
      } else {
        console.log('not log in', result);
        window.location.href = '/log-in/0';
      }
    });
  }
}
