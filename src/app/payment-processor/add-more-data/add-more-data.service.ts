import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/model/product';
import { subscriberUsagesMock } from '../../shared/mocks';
import { requestPaths } from '../../shared/consts';
import { catchError } from 'rxjs/operators';
import { TransactionProcessResponse } from '../../shared/model/transactionProcessResponse';

@Injectable({
  providedIn: 'root'
})
export class AddMoreDataService {

  constructor(private http: HttpClient) {}

  public initiatePaymentProcess(body: any) {
    return this.http.post<TransactionProcessResponse>(`${requestPaths.api}product/purchase`, body)
    //   .pipe(
    //   catchError(() => of({redirectRef: 'https://samo.anextour.com/export/redirect.php?code=7c01d149e24c49fa872b947ef74b1b45'}))
    // );
  }

  public getProducts(id: string): Observable<Product[]> {
    // return of([]);
    // return of(subscriberUsagesMock as Product[]);
    return this.http.get<Product[]>(`${requestPaths.api}subscriber/${id}/products`);
  }

  public getPaymentMethods(id: string): Observable<any> {
    // return of([]);
    // return of(subscriberUsagesMock as Product[]);
    return this.http.get<Product[]>(`${requestPaths.api}subscriber/${id}/payment-methods`);
  }

  //TODO remove it in future (in case if we are not using it)
  public postDataToExternalUrl(url: string, data: { [key: string]: any }) {
    const form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    form.style.display = 'none';

    Object.keys(data).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }
}
