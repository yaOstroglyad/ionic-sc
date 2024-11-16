import { Injectable, OnDestroy } from '@angular/core';
import { LoginRequest } from '../shared/model/loginRequest';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginResponse } from '../shared/model/loginResponse';
import { catchError } from 'rxjs/operators';
import { showToast, ToastColor } from '../shared/utils/toast.utils';
import { HttpErrorResponse } from '@angular/common/http';

function parseErrorMessage(error: any): string {
  if (error instanceof HttpErrorResponse) {
    const errorContent = extractErrorContent(error.error);

    if (errorContent) {
      if (errorContent.includes('Field error')) {
        return extractValidationErrors(errorContent);
      }

      const parsedError = parseJson(errorContent);
      if (parsedError?.error && parsedError?.error_description) {
        return `${parsedError.error}: ${parsedError.error_description}`;
      }

      return errorContent;
    }

    return `Error ${error.status}: ${error.statusText}`;
  }

  return error.message || 'An unknown error occurred';
}

function extractErrorContent(error: any): string | null {
  if (typeof error === 'object' && error.message) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  }
  return null;
}

function parseJson(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

function extractValidationErrors(errorDescription: string): string {
  const regex = /Field error in object '(\w+)' on field '(\w+)'.*?default message \[(.*?)\]/g;
  const matches = [...errorDescription.matchAll(regex)];

  if (matches.length === 0) {
    return 'Validation error occurred, but details are unclear.';
  }

  const extractedErrors = matches.map(match => {
    const field = match[2];
    const message = match[3];
    return `Field '${field}' - ${message}`;
  });

  return `Validation failed: ${extractedErrors.join('; ')}`;
}


@Injectable({providedIn: 'root'})
export class LoginService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login(credentials: LoginRequest): void {

    this.authService.authorize(credentials)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          return showToast({
            message: parseErrorMessage(error),
            color: ToastColor.danger
          });
        })
      )
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
