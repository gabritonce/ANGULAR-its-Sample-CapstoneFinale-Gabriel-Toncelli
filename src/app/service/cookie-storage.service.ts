import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SampleResult } from '../constance/interface';
export enum Token {
  RefreshToken = 'token',
  favuoriteList = 'favuoriteList',
}

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor(private cookie: CookieService) {}
  setCookie(value: string) {
    this.cookie.set(Token.RefreshToken, value);
  }

  checkCookie(): boolean {
    return this.cookie.check(Token.RefreshToken);
  }

  getCookie(): string {
    return this.cookie.get(Token.RefreshToken);
  }
  deleteCookie() {
    this.cookie.delete(Token.RefreshToken);
  }

  setList(sampleList: SampleResult[]) {
    this.cookie.set(Token.favuoriteList, JSON.stringify(sampleList));
  }

  checklist(): boolean {
    return this.cookie.check(Token.favuoriteList);
  }

  getList(): SampleResult[] {
    return JSON.parse(this.cookie.get(Token.favuoriteList));
  }

  deleteList() {
    this.cookie.delete(Token.favuoriteList);
  }
}
