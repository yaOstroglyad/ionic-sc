import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationPageService } from './registration-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { showToast, ToastColor } from '../shared/utils/toast.utils';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPagePage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public form: FormGroup;
  public accountId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationPageService: RegistrationPageService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });

    this.form.get('email').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(emailValue => {
      this.form.get('loginName').setValue(emailValue);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailValidator.bind(this)]
      }),
      loginName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required)
    });

    ['firstName', 'lastName', 'password'].forEach(controlName => {
      this.addTrimListener(controlName);
    });
  }

  emailValidator(control: FormControl): Observable<{ [key: string]: boolean } | null> {
    if (!control.value) {
      return of(null);
    }

    return this.registrationPageService.verifyEmail(control.value).pipe(
      debounceTime(300),
      map((response: { isExist: boolean }) => {
        return response.isExist ? {emailExists: true} : null;
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }

  private addTrimListener(controlName: string): void {
    const subscription = this.form.get(controlName).valueChanges.subscribe(value => {
      if (value !== null) {
        const trimmedValue = value.trim();
        if (this.form.get(controlName).value !== trimmedValue) {
          this.form.get(controlName).setValue(trimmedValue, {emitEvent: false});
        }
      }
    });
    this.subscriptions.push(subscription);
  }

  register(): void {
    if (this.form.invalid || this.form.pending) {
      showToast({
        message: 'The form is filled out incorrectly',
        color: ToastColor.danger
      });
      return;
    }

    this.registrationPageService.register(this.form.value, this.accountId).pipe(
      switchMap(async () => {
        const message = await this.translate.get('common.registration-success').toPromise();
        showToast({
          message,
          color: ToastColor.success
        });

        const loginName = this.form.get('loginName').value;
        const password = this.form.get('password').value;

        this.router.navigate(['/login', loginName, password]);

        return of(null);
      }),
      catchError(async (error) => {
        const errorMessage = await this.translate.get('common.registration-failure').toPromise();
        showToast({
          message: errorMessage,
          color: ToastColor.danger
        });
        console.error('Registration error: ', error);
        return of(null);
      })
    ).subscribe();
  }

  backToLoginPage() {
    this.router.navigate(['/login']);
  }
}
