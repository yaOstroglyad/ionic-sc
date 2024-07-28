import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationPageService } from './registration-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastPosition } from '../shared/utils/toast.utils';
import { TranslateService } from '@ngx-translate/core';
import { Color } from '../shared/utils/ionic.utils';
import { Subscription } from 'rxjs';

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
    //Add autologin after registration
    this.form = new FormGroup({
      loginName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required)
    });

    // Add trim to username and password
    this.addTrimListener('loginName');
    this.addTrimListener('password');

    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private addTrimListener(controlName: string): void {
    const subscription = this.form.get(controlName).valueChanges.subscribe(value => {
      if (value !== null) {
        this.form.get(controlName).setValue(value.trim(), { emitEvent: false });
      }
    });
    this.subscriptions.push(subscription);
  }

  async register(): Promise<void> {
    this.registrationPageService.register(this.form.value, this.accountId).subscribe(
      async () => {
        const message = await this.translate.get('common.registration-success').toPromise();
        await this.presentToast(message, Color.success);
        this.backToLoginPage();
      },
      async (error) => {
        const errorMessage = await this.translate.get('common.registration-failure').toPromise();
        await this.presentToast(errorMessage, Color.danger);
        console.error('Registration error: ', error);
      }
    );
  }

  backToLoginPage() {
    this.router.navigate(['/login']);
  }

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
