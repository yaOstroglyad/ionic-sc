import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionProcessResponse } from '../shared/model/transactionProcessResponse';
import { requestPaths } from '../shared/consts';
import { Product } from '../shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class AddMoreDataService {

  constructor(private http: HttpClient) {}

  public initiatePaymentProcess(body: any) {
    return this.http.post<TransactionProcessResponse>(`${requestPaths.api}product/purchase`, body)
  }

  public getProducts(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${requestPaths.api}subscriber/${id}/products`);
  }

  public getPaymentMethods(id: string): Observable<any> {
    return this.http.get<Product[]>(`${requestPaths.api}subscriber/${id}/payment-methods`);
  }
}
