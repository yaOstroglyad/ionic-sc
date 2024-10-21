import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationPageService } from './registration-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastPosition } from '../shared/utils/toast.utils';
import { TranslateService } from '@ngx-translate/core';
import { Color } from '../shared/utils/ionic.utils';
import { Subscription, Observable, of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPagePage implements OnInit, OnDestroy {

  form: FormGroup;
  accountId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationPageService: RegistrationPageService,
    private toastController: ToastController,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailValidator.bind(this)],
        updateOn: 'blur'
      }),
      loginName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required)
    });

    this.addTrimListener('firstName');
    this.addTrimListener('lastName');
    this.addTrimListener('password');

    this.form.get('email').valueChanges.subscribe(emailValue => {
      if (this.form.get('email').valid) {
        this.form.get('loginName').setValue(emailValue);
      }
    });

    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Add trim listener to form fields
  private addTrimListener(controlName: string): void {
    const subscription = this.form.get(controlName).valueChanges.subscribe(value => {
      if (value !== null) {
        this.form.get(controlName).setValue(value.trim(), { emitEvent: false });
      }
    });
    this.subscriptions.push(subscription);
  }

  // Custom async validator for email field
  emailValidator(control: FormControl): Observable<{ [key: string]: boolean } | null> {
    return this.registrationPageService.verifyEmail(control.value).pipe(
      map((response: { isExist: boolean }) => {
        return response.isExist ? { emailExists: true } : null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  // Register the user
  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.registrationPageService.register(this.form.value, this.accountId).pipe(
      switchMap(async () => {
        const message = await this.translate.get('common.registration-success').toPromise();
        await this.presentToast(message, Color.success);

        const loginName = this.form.get('loginName').value;
        const password = this.form.get('password').value;

        this.router.navigate(['/login', loginName, password]);

        return of(null);
      }),
      catchError(async (error) => {
        const errorMessage = await this.translate.get('common.registration-failure').toPromise();
        await this.presentToast(errorMessage, Color.danger);
        console.error('Registration error: ', error);
        return of(null);
      })
    ).subscribe();
  }

  // Navigate back to the login page
  backToLoginPage() {
    this.router.navigate(['/login']);
  }

  // Show toast notification
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: ToastPosition.top,
      color: color
    });

    await toast.present();
  }
}
