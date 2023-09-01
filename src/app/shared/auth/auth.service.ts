import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JwtHelperService } from './jwt-helper.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { includes } from 'lodash';
import { LoginRequest } from '../model/loginRequest';
import { UserViewConfig } from '../model/userViewConfig';

@Injectable({providedIn: 'root'})
export class AuthService {
  private static AUTH_URL = '/api/auth/login';
  private static RE_AUTH_URL = '/api/auth/refresh';
  private rememberMe: boolean = false;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private $SessionStorageService: SessionStorageService,
              private $LocalStorageService: LocalStorageService) {
  }

  /** Method "initViewBasedOnCurrentUser" should call BE api and init view based on customer config in DB **/
  public initViewBasedOnCurrentUser(): Observable<UserViewConfig> {
    return of({
      primaryColor: '#f9a743',
      language: 'en'
    })
  }
  public authorize(credentials: LoginRequest): Observable<any> {
    this.rememberMe = credentials.rememberMe;

    delete credentials.rememberMe;

    const bodyString = JSON.stringify(credentials);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(AuthService.AUTH_URL, bodyString, {
      headers: headers,
      responseType: 'text',
      observe: 'response'
    }).pipe(tap(res => {
      const result = <any>res;
      this.storeAuthenticationToken(result.headers.get('Authorization'));
    }));
  }
  public storeAuthenticationToken(jwt: any): void {
    if (this.rememberMe) {
      this.$LocalStorageService.store('authenticationToken', jwt);
    } else {
      this.$SessionStorageService.store('authenticationToken', jwt);
    }
  }
  public deleteAuthenticationToken(): void {
    this.$SessionStorageService.clear('authenticationToken');
    this.$LocalStorageService.clear('authenticationToken');
  }
  public isAuthorized(auth: string): boolean {
    const token = this.$SessionStorageService.retrieve('authenticationToken');
    if (this.jwtHelper.isToken(token)) {
      const jwtToken = this.jwtHelper.decodeToken(token);
      return includes(jwtToken.AUTH, auth);
    } else {
      console.error('Token is empty');
      return false;
    }
  }
  public reLogin(token: any): Observable<any> {
    const headers = new HttpHeaders();
    const bodyString = JSON.stringify(token);
    headers.set('Content-Type', 'application/json');
    return this.http.post(AuthService.RE_AUTH_URL, bodyString, {
      headers: headers,
      responseType: 'text',
      observe: 'response'}).pipe(tap(res => {
      const result = <any>res;
      this.storeAuthenticationToken(result.headers.get('Authorization'));
    }));
  }
  public isAuthenticated(): boolean {
    const token = this.$SessionStorageService.retrieve('authenticationToken');
    if (this.jwtHelper.isToken(token)) {
      return !this.jwtHelper.isTokenExpired(token, 900);
    }
    return false;
  }

}
