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
import { secondSubscriberUsagesMock, subscribersInfoMock, subscriberUsagesMock } from '../shared/mocks';
import { Package } from '../shared/model/package';


@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private authService: AuthService,
              private $sessionStorage: SessionStorageService,
              private cookieHelperService: CookieHelperService,
              private router: Router,
              private http: HttpClient) {
  }

  public getSubscribers(): Observable<SubscriberInfo[]> {
    // return this.http.get<SubscriberInfo>(`${requestPaths.api}subscriber`);
    return of(subscribersInfoMock);
  }

  public getSubscriberUsage(id: string): Observable<Package[]> {
    // return this.http.get<SubscriberUsage>(`${requestPaths.api}subscriber/usage`);
    if(id === '3fb85f64-5717-4562-b3fc-2c963f66afa6') {
      return of(subscriberUsagesMock);
    }
    if(id === '3fa85f64-5717-4562-b3fc-2c963f66afa7') {
      return of(secondSubscriberUsagesMock);
    }
    if(!id) {
      return of([]);
    }
  }
}
