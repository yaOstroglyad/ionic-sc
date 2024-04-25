import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddMoreDataService {

  constructor(private http: HttpClient) {}

  public initiatePaymentProcess(id, body) {
    return of('https://esim.dev.global-sim.app/home');
    // return this.http.get<PurchaseHistory[]>(`${requestPaths.api}subscriber/${id}/purchase/initiate`);
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
