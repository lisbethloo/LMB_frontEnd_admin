import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  /* constructor para llamar la pagina del login */
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (!this.authService.isLoggedIn()) {
          this.router.navigateByUrl('/auth/login');
          this.authService.deleteToken();
          return false;
        }
      return true;
    }
  }
