import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  hostName = 'http://localhost:3000';

  headers = new HttpHeaders().set(
    'Content-type',
    'application/json'
  );

  options: any;

  constructor(public http: HttpClient, public storage: Storage) {
    this.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    this.options = { headers: this.headers,  withCredentials: true};
  }

  getRestaurants(): Observable<any> {
    return this.http.get(this.hostName + '/restaurants');
  }
  getRestaurant(id): Observable<any> {
    return this.http.get(this.hostName + '/restaurants/' + id);
  }

  updateRestaurant(id, item): Observable<any> {
    return this.http.post(this.hostName + '/restaurants/' + id, item);
  }

  register(item): Observable<any> {
    return this.http.post(this.hostName + '/restaurants', item);
  }

  login(item): Observable<any> {
    return this.http.post(this.hostName + '/login', item);
  }

  setLoginStorage(rst) {
    if (rst.name) {
      this.storage.set('rstName', rst.name);
    }
    if (rst.id) {
      this.storage.set('rstId', rst.id).then(result => {
        window.location.href = '/admins/home';
      });
    }
  }

  logout() {
    this.storage.remove('rstName').then(result1 => {
      this.storage.remove('rstId').then(result2 => {
        window.location.href = '/log-in/1';
      });
    });
  }

  checkLoginStatus() {
    this.storage.get('rstId').then(result => {
      // tslint:disable-next-line:radix
      if (result && parseInt(result) > 0) {
        console.log('login', result);
      } else {
        console.log('not log in', result);
        window.location.href = '/log-in/1';
      }
    });
  }

  uploadFile(file, id): Observable<any> {
    return this.http.post(this.hostName + '/rstimage/' + id, file);
  }

}
