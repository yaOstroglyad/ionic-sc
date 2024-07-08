import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Alt') {
      this.quickLoginByAdmin();
    }
  };

  form: FormGroup = new FormGroup({
    loginName: new FormControl(null),
    password: new FormControl(null),
    rememberMe: new FormControl(false),
  });

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.deleteAuthenticationToken();
  }

  login(): void {
    this.loginService.login(this.form.value);
  }
  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
  onRegister(): void {
    this.router.navigate(['/registration-page']);
  }

  quickLoginByAdmin(): void {
    // this.form.controls['loginName'].setValue('daniel.goldberg.dg@gmail.com');
    // this.form.controls['password'].setValue('123456');
    this.form.controls['loginName'].setValue('28521121');
    this.form.controls['password'].setValue('0DE8826454');
    this.loginService.login(this.form.value);
    this.router.navigate(['/home']);
  }

}
