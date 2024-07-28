import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class RegistrationPageService {

  constructor(private http: HttpClient) {
  }
  public register(credentials: any, accountId: string): Observable<any> {
    return this.http.post(`/api/v1/users/command/create/account/${accountId}`, credentials);
  }
}
