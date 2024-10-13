import { Injectable, OnDestroy } from '@angular/core';
import { LoginRequest } from '../shared/model/loginRequest';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginResponse } from '../shared/model/loginResponse';
import { catchError } from 'rxjs/operators';
import { showErrorToast } from '../shared/utils/toast.utils';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

function parseErrorMessage(error: any): string {
  // Проверяем, если ошибка — это HttpErrorResponse
  if (error instanceof HttpErrorResponse) {
    const errorContent = extractErrorContent(error.error);

    if (errorContent) {
      // Если есть ошибки валидации, обработаем их через extractValidationErrors
      if (errorContent.includes('Field error')) {
        return extractValidationErrors(errorContent);
      }

      // Если сообщение содержит error и error_description
      const parsedError = parseJson(errorContent);
      if (parsedError?.error && parsedError?.error_description) {
        return `${parsedError.error}: ${parsedError.error_description}`;
      }

      // Возвращаем сообщение как есть
      return errorContent;
    }

    // Возвращаем статус ошибки, если нет сообщения
    return `Error ${error.status}: ${error.statusText}`;
  }

  // Если это не HttpErrorResponse, возвращаем стандартное сообщение
  return error.message || 'An unknown error occurred';
}

// Функция для извлечения основного содержания ошибки (включая JSON)
function extractErrorContent(error: any): string | null {
  if (typeof error === 'object' && error.message) {
    return error.message; // Если error — объект с сообщением
  } else if (typeof error === 'string') {
    return error; // Если error — строка
  }
  return null;
}

// Функция безопасного парсинга JSON
function parseJson(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

// Функция для извлечения ошибок валидации из сообщения
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

  constructor(private authService: AuthService,
              private toastController: ToastController,
              private router: Router) {
  }

  public login(credentials: LoginRequest): void {
    this.authService.authorize(credentials)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          return showErrorToast(this.toastController, parseErrorMessage(error));
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
