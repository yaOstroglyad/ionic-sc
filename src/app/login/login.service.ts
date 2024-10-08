import { Injectable, OnDestroy } from '@angular/core';
import { LoginRequest } from '../shared/model/loginRequest';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginResponse } from '../shared/model/loginResponse';


@Injectable({providedIn: 'root'})
export class LoginService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public login(credentials: LoginRequest): void {
    this.authService.authorize(credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: LoginResponse) => {
        if (result) {
          this.authService.scheduleTokenRefresh(result);
          this.router.navigate(['/home']);
        } else {
          console.error('Token not found after authorization.');
        }
      });
  }

  public logout(): void {
    this.authService.clearAndLogout();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
