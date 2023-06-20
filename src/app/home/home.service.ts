import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';
import { AuthService } from '../shared/auth/auth.service';
import { SessionStorageService } from 'ngx-webstorage';
import { CookieHelperService } from '../shared/auth/cookie-helper.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { SubscriberUsage } from '../shared/model/subscriberUsage';
import { subscriberInfoMock, subscriberUsageMock } from '../shared/mocks';


@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private authService: AuthService,
              private $sessionStorage: SessionStorageService,
              private cookieHelperService: CookieHelperService,
              private router: Router,
              private http: HttpClient) {
  }

  public getSubscriber(): Observable<SubscriberInfo> {
    // return this.http.get<SubscriberInfo>(`${requestPaths.api}subscriber`);
    return of(subscriberInfoMock);
  }

  public getSubscriberUsage(): Observable<SubscriberUsage> {
    // return this.http.get<SubscriberUsage>(`${requestPaths.api}subscriber/usage`);
    return of(subscriberUsageMock);
  }
}
