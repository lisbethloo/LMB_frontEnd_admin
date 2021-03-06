import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { IPublicaciones } from './publicaciones';

@Injectable({
  providedIn: 'root'
})
export class PulicacionService {

  routeParams: any;
  product: any;
  onPublicacionChanged: BehaviorSubject<any>;
  constructor(
      private _httpClient: HttpClient,
      private _authService: AuthService
  ) {
      // Set the defaults
      this.onPublicacionChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      this.routeParams = route.params;

      return new Promise((resolve, reject) => {

          Promise.all([
              this.getPublicacion()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  /*getPublicacion(): Promise<any> {
      return new Promise((resolve, reject) => {
          if ( this.routeParams.id === 0 ) {
              this.onPublicacionChanged.next(false);
              resolve(false);
          } else {
              this._httpClient.get( environment.apiBaseUrl + '/publicacion/' + this.routeParams.id)
                  .subscribe((response: any) => {
                      this.product = response;
                      this.onPublicacionChanged.next(this.product);
                      resolve(response);
                  }, reject);
          }
      });
  }*/
  getPublicacion(): Observable<any> {
      return this._httpClient.get(environment.apiBaseUrl + '/publicacion/');
  }
  addPublicacion(publicacion: IPublicaciones): Observable<IPublicaciones> {
    return this._httpClient.post(environment.apiBaseUrl + '/publicacion', publicacion);
  }
  updatePublicacion(publicacion: IPublicaciones): Observable<IPublicaciones>  {
    return this._httpClient.put(environment.apiBaseUrl + '/publicacion/' + publicacion.id, publicacion);
  }
  delPublicaciones(publicacion: any)  {
    return this._httpClient.delete(environment.apiBaseUrl + '/publicacion/' + publicacion);
  }

  getUsers() {
        return this._httpClient.get(environment.apiBaseUrl + '/usuario');
  }

  savePublicacion(product): Promise<any> {
      product.autor = this._authService.getUserPayload().id;
      return new Promise((resolve, reject) => {
          this._httpClient.put(environment.apiBaseUrl + '/publicacion/' + product.id, product)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
  }
/*
  addPublicacion(product): Promise<any> {
      delete product.id;
      product.autor = this._authService.getUserPayload().id;
      return new Promise((resolve, reject) => {
          this._httpClient.post(environment.apiBaseUrl + '/publicacion', product)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
  }*/
}
