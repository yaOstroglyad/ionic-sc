import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
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
    rememberMe: new FormControl(true)
  });

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.deleteLoginResponse();
    this.autologin();
  }

  autologin(): void {
    const loginName = this.route.snapshot.paramMap.get('loginName');
    const password = this.route.snapshot.paramMap.get('password');

    if (loginName && password) {
      this.form.controls['loginName'].setValue(loginName);
      this.form.controls['password'].setValue(password);
      this.form.controls['rememberMe'].setValue(true);
      this.loginService.login(this.form.value);
    }
  }

  login(): void {
    this.loginService.login(this.form.value);
  }

  quickLoginByAdmin(): void {
    this.form.controls['rememberMe'].setValue(true);
    this.loginService.login(this.form.value);
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onRegister(): void {
    this.router.navigate(['/registration-page']);
  }
}
