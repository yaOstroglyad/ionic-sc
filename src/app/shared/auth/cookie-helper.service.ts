import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({providedIn: 'root'})
export class CookieHelperService {

  constructor(private cookieService: CookieService) { }

  setTokenToCookie (token: any): void {
    this.deleteTokenFromCookie();
    const tenSecond = 299 * 1000;
    const currentTimestamp = new Date();
    const futureTimestamp = currentTimestamp.getTime() + tenSecond;
    const futureTimestamp2 = new Date(futureTimestamp);
    this.cookieService.set( 'token', JSON.stringify(token), futureTimestamp2 );
  }

  deleteTokenFromCookie(): void {
    this.cookieService.deleteAll();
    localStorage.clear();
    sessionStorage.clear();
  }

  get getTokenFromCookie() {
    return this.cookieService.get('token');
  }
}
