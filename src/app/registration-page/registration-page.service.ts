import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({providedIn: 'root'})
export class RegistrationPageService {

  constructor(private http: HttpClient) {
  }
  public register(credentials: any, accountId: string): Observable<any> {
    return this.http.post(`/api/v1/users/command/create/account/${accountId}`, credentials);
  }

  public verifyEmail(email: string): Observable<{ isExist: boolean }> {
    // return of({isExist: false})
    return this.http.get<{ isExist: boolean }>(`/api/v1/users/query/verify-user`, {
      params: { email }
    });
  }
}
