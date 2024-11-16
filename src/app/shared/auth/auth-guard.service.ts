import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService
  ) {}

  private isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.auth.clearAndLogout();
        }
      })
    );
  }

  public canActivate(): Observable<boolean> {
    return this.isAuthenticated();
  }

  public canActivateChild(): Observable<boolean> {
    return this.isAuthenticated();
  }
}
