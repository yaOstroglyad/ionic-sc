import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestPaths } from '../shared/consts';


@Injectable({providedIn: 'root'})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {}

  validateCodeAndUpdatePassword(password: any, accountId: string) {
    return this.http.post(`${requestPaths.api}forgot-password-for-portal`, password);
  }

  validateUser() {
    return this.http.get(`${requestPaths.api}validate`);
  }
}
