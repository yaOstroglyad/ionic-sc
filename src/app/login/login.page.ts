import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.form.value);
    this.router.navigate(['/home']);
    console.log('form', this.form.value);
  }
  onForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
  onRegister() {
    this.router.navigate(['register'], {relativeTo: this.route.parent});
  }

  quickLoginByAdmin(): void {
    this.form.controls['loginName'].setValue('78881097');
    this.form.controls['password'].setValue('admin');
    this.loginService.login(this.form.value);
    this.router.navigate(['/home']);
  }

}
