import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';
import { delay, Observable, of } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Package } from '../shared/model/package';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  public getSubscribers(): Observable<SubscriberInfo[]> {
    return this.http.get<SubscriberInfo[]>(`${requestPaths.api}subscribers`).pipe(
      delay(1000),
      catchError(() => {
        console.warn('error happened, no subscriber info');
        return of([])
      })
    );
  }

  public getSubscriberUsage(id: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${requestPaths.api}subscriber/${id}/packages`).pipe(
      catchError(() => {
        console.warn('error happened, no package');
        return of([])
      })
    );
  }
}
