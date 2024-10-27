import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { SubscriberInfo } from '../model/subscriberInfo';
import { requestPaths } from '../consts';
import { catchError } from 'rxjs/operators';
import { Package } from '../model/package';

@Injectable({
  providedIn: 'root'
})
export class SubscriberDataService {

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
    return this.http.get<Package[]>(`${requestPaths.api}subscriber/${id}/bundles`).pipe(
      catchError(() => {
        console.warn('error happened, no package');
        return of([])
      })
    );
  }
}
