import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieStorageService } from './service/cookie-storage.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'capstone';
  constructor(
    private logInService: LoginService,
    private cookieService: CookieStorageService
  ) {}
  ngOnInit() {}
}
