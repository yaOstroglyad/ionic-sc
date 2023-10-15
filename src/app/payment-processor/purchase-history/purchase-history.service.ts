import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { requestPaths } from '../../shared/consts';
import { HttpClient } from '@angular/common/http';
import { PurchaseHistory } from '../../shared/model/purchaseHistory';

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
