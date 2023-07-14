import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { CookieStorageService } from '../service/cookie-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieStorageService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogged = this.authService.isLogged;
    if (isLogged) {
      return true;
    } else {
      const userExist = this.cookieService.checkCookie();
      if (userExist) {
        // devo avere una API che, dato il token mi restituisce l'informazione dell'utente
        const token: string = this.cookieService.getCookie();
        this.authService.loginByToken(token);
        return true;
      }
    }
    this.authService.logOut();
    return false;
  }
}
