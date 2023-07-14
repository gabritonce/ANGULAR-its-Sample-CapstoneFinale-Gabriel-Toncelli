import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { CookieStorageService } from './cookie-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  clientId: string = 'K0hf3v2xuu5ZNHT7hJy2';
  key: string = 'chE2DAdV1RE0kzF6MR65AiOFT0EQKrlvj75cw578';
  accessToken: string = '';
  refreshToken: string = '';
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieStorageService: CookieStorageService
  ) {}

  goToFreeSound() {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('response_type', 'code');
    const URL =
      'https://freesound.org/apiv2/oauth2/authorize/?' + params.toString();
    window.open(URL);
  }

  logIn(code: string) {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.key)
      .set('grant_type', 'authorization_code')
      .set('code', code);
    this.apiService
      .post('https://freesound.org/apiv2/oauth2/access_token/', body)
      .then((res) => {
        this.accessToken = res.access_token;
        this.refreshToken = res.refresh_token;
        this.router.navigate(['/home']);
        this.cookieStorageService.setCookie(this.refreshToken);
        this.userData.next(res);
      })
      .catch((err) => {
        alert('errore');
      });
  }

  onReload(token: string) {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.key)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', token);
    console.log(body);
    this.apiService
      .post('https://freesound.org/apiv2/oauth2/access_token/', body)
      .then((res) => {
        this.accessToken = res.access_token;
        this.refreshToken = res.refresh_token;
        this.cookieStorageService.setCookie(this.refreshToken);
        console.log(this.accessToken);
        console.log(this.refreshToken);
        this.userData.next(res);
      })
      .catch((err) => {
        alert('errore');
        this.logOutWithoutToken();
      });
  }

  logOut() {
    this.cookieStorageService.deleteCookie();
    this.userData.next(null);
    this.router.navigate(['']);
  }

  logOutWithoutToken() {
    this.cookieStorageService.deleteCookie();
    this.userData.next(null);
  }
}
