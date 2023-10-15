import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class RegistrationPageService {

  constructor(private http: HttpClient) {
  }
  public register(credentials: any): Observable<any> {
    return this.http.post(`${requestPaths.api}register`, credentials);
  }
}
