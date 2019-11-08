import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IUser } from './user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*datos que recopilan para hacer la publicacion*/
  selectedUser: IUser = {
    id: 0,
    user: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    descripcion: '',
    puntos: 0,
    imagen: '',
  };
  _id: any;

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  private logSource = new BehaviorSubject(false);
  isLoggedInOb = this.logSource.asObservable();

  private dataSource = new BehaviorSubject(this.selectedUser);
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) {
    console.log('service started!');
    this.logSource.next(this.isLoggedIn());
   }

  changeData(data: IUser) {
    this.dataSource.next(data);
  }

  setLogginState() {
    this.logSource.next(this.isLoggedIn());
  }

  // HttpMethods

  postUser(user: any) {
    return this.http.post(environment.apiBaseUrl + '/usuario', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/login', authCredentials, this.noAuthHeader);
  }



  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.logSource.next(true);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.setLogginState();
  }

  getUserPayload(): any {
    // tslint:disable-next-line:prefer-const
    let token = this.getToken();
    if (token) {
      // tslint:disable-next-line:prefer-const
      let userPayload = atob(token.split('.')[1]);
      // console.log( JSON.parse(userPayload));
      this._id = JSON.parse(userPayload)._id;
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    // tslint:disable-next-line:prefer-const
    let userPayload = this.getUserPayload();
    if (userPayload) {
      this.logSource.next(userPayload.exp > Date.now() / 1000);
      return userPayload.exp > Date.now() / 1000;
    } else {
      this.logSource.next(false);
      return false;
    }
  }
}
