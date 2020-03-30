import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

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
