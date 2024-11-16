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
      catchError(() => {
        console.warn('error happened, no subscriber info');
        return of([])
      })
    );
  }

  public getSubscriberUsage(id: string): Observable<Package[]> {
    // return of([
    //   {
    //     "id": "33ae69e5-41f7-4258-aff6-92ffb1e2f8b7",
    //     "name": "Turkey 300Mb",
    //     "startedAt": null,
    //     "expiredAt": null,
    //     "status": "active",
    //     "usages": [
    //       {
    //         "type": "data",
    //         "unitType": "Megabyte",
    //         "total": 314572800,
    //         "used": 0,
    //         "remaining": 314572800
    //       }
    //     ]
    //   },
    //   {
    //     "id": "33ae69e5-41f7-4258-aff6-92ffb1e2f8b8",
    //     "name": "Turkey 100Mb",
    //     "startedAt": null,
    //     "expiredAt": null,
    //     "status": "active",
    //     "usages": [
    //       {
    //         "type": "data",
    //         "unitType": "Megabyte",
    //         "total": 114572800,
    //         "used": 0,
    //         "remaining": 114572800
    //       }
    //     ]
    //   }
    // ] as any)
    return this.http.get<Package[]>(`${requestPaths.api}subscriber/${id}/bundles`).pipe(
      catchError(() => {
        console.warn('error happened, no package');
        return of([])
      })
    );
  }
}
