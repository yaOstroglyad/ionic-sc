import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PurchaseHistory } from '../shared/model/purchaseHistory';
import { requestPaths } from '../shared/consts';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  constructor(private http: HttpClient) { }

  public getSubscriberPurchaseHistory(id: string): Observable<PurchaseHistory[]> {
    // return of([]);
    return this.http.get<PurchaseHistory[]>(`${requestPaths.api}subscriber/${id}/purchase/history`);
  }
}
