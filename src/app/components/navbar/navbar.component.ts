import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CookieStorageService } from 'src/app/service/cookie-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public get isLogged(): boolean {
    return this.authService.isLogged;
  }

  logOut() {
    this.authService.logOut();
  }
}
