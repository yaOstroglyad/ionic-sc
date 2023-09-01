import { Injectable } from '@angular/core';
import { LoginRequest } from '../shared/model/loginRequest';
import { AuthService } from '../shared/auth/auth.service';
import { SessionStorageService } from 'ngx-webstorage';
import { CookieHelperService } from '../shared/auth/cookie-helper.service';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private authService: AuthService,
              private $sessionStorage: SessionStorageService,
              private cookieHelperService: CookieHelperService,
              private router: Router) {
  }

  login(credentials: LoginRequest): void {
    this.authService.authorize(credentials).subscribe(result => {
      const token = this.$sessionStorage.retrieve('authenticationToken');
      this.cookieHelperService.setTokenToCookie(token);
      this.router.navigate(['/home']);
    });
  }

  logout(): void {
    this.authService.deleteAuthenticationToken();
    this.cookieHelperService.deleteTokenFromCookie();
    this.router.navigate(['/login']);
  }
}
