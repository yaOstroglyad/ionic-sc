import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginResponse = this.$sessionStorage.retrieve('loginResponse') || this.$localStorage.retrieve('loginResponse');

    if (req.url.includes('/assets/i18n/')) {
      return next.handle(req);
    }

    // if Native platform, use modified API URL
    if (Capacitor.isNativePlatform()) {
      if (!req.url.startsWith('http')) {
        req = req.clone({
          url: `${environment.apiUrl}${req.url}`
        });
      }
    }

    if (loginResponse?.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loginResponse?.token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(errorResponse);
      })
    );
  }
}
