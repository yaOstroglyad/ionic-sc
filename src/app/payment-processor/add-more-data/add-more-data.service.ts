import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/model/product';
import { subscriberUsagesMock } from '../../shared/mocks';
import { requestPaths } from '../../shared/consts';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddMoreDataService {

  constructor(private http: HttpClient) {}

  public initiatePaymentProcess(body: any) {
    return this.http.post<any>(`${requestPaths.api}product/purchase`, body)
    //   .pipe(
    //   catchError(() => of('https://esim.dev.global-sim.app/home'))
    // );
  }

  public getProducts(id: string): Observable<Product[]> {
    // return of([]);
    // return of(subscriberUsagesMock as Product[]);
    return this.http.get<Product[]>(`${requestPaths.api}subscriber/${id}/products`);
  }

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
