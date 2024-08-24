import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';
import { delay, Observable, of } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Package } from '../shared/model/package';
import { catchError, tap } from 'rxjs/operators';
import { UsageInfo } from '../shared/model/usageInfo';
import UnitTypeDataEnum = UsageInfo.UnitTypeDataEnum;

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
    return this.http.get<Package[]>(`${requestPaths.api}subscriber/${id}/bundles`).pipe(
      tap(e => {
        e.push(  {
          "id": "68421f78-65ab-4352-a920-861f1db473f8",
          "name": "Isra 5Gb",
          "usages": [
            {
              "type": "data",
              "unitType": UnitTypeDataEnum.Gb,
              "total": 5368709120,
              "used": 1218534400,
              "remaining": 1750174720
            }
          ]
        })
        console.log('e',e);
      }),
      catchError(() => {
        console.warn('error happened, no package');
        return of([])
      })
    );
  }
}
