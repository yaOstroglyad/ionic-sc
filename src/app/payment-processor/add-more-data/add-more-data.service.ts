import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseHistory } from '../../shared/model/purchaseHistory';
import { requestPaths } from '../../shared/consts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddMoreDataService {

  constructor(private http: HttpClient) {}

  public getSubscriberPurchaseHistory(id: string): Observable<PurchaseHistory[]> {
    // return of([]);
    return this.http.get<PurchaseHistory[]>(`${requestPaths.api}subscriber/${id}/purchase/history`);
  }
}
