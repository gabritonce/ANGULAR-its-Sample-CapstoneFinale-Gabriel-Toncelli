import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  constructor(private loginService: LoginService) {
    this.loginForm = new UntypedFormGroup({
      code: new UntypedFormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onCheckForm() {
    if (this.loginForm.valid) {
      console.log('è valido');
    } else {
      alert('tutti i campi richiesti non sono stati compilati ');
      console.log('non è valido');
    }
  }

  onLogin() {
    const code = this.loginForm.get('code').value;
    this.loginService.logIn(code);
  }

  onGoToFreeSound() {
    this.loginService.goToFreeSound();
  }
}
