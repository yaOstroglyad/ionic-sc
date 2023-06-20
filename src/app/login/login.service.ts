import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../shared/model/loginRequest';
import { AuthService } from '../shared/auth/auth.service';
import { SessionStorageService } from 'ngx-webstorage';
import { CookieHelperService } from '../shared/auth/cookie-helper.service';
import { Router } from '@angular/router';
import { requestPaths } from '../shared/consts';


@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private authService: AuthService,
              private $sessionStorage: SessionStorageService,
              private cookieHelperService: CookieHelperService,
              private router: Router,
              private http: HttpClient) {
  }

  login(credentials: LoginRequest): void {
    this.authService.authorize(credentials).subscribe(result => {
      const token = this.$sessionStorage.retrieve('authenticationToken');
      this.cookieHelperService.setTokenToCookie(token);
    });
  }

  forgotPasswordForPortal(login: any) {
    return this.http.post(`${requestPaths.api}forgot-password-for-portal`, login);
  }

  logout(): void {
    this.authService.deleteAuthenticationToken();
    this.cookieHelperService.deleteTokenFromCookie();
    this.router.navigate(['/login']);
  }
}
