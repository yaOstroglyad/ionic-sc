import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';
import { delay, Observable } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Package } from '../shared/model/package';

@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  public getSubscribers(): Observable<SubscriberInfo[]> {
    return this.http.get<SubscriberInfo[]>(`${requestPaths.api}subscribers`).pipe(
      delay(1000)
    );
  }

  public getSubscriberUsage(id: string): Observable<Package[]> {
    // return of(subscriberUsagesMock as Package[]);
    return this.http.get<Package[]>(`${requestPaths.api}subscriber/${id}/packages`);
  }
}
