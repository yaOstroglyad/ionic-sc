import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMoreDataService } from './add-more-data.service';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Product } from '../shared/model/product';
import { PaymentMethods } from '../shared/model/paymentMethods';
import { showErrorToast } from '../shared/utils/toast.utils';
import { TransactionProcessResponse } from '../shared/model/transactionProcessResponse';
import { Platform, ToastController } from '@ionic/angular';
import { SubscriberService } from '../shared/services/subscriber.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss']
})
export class AddMoreDataComponent implements OnInit {
  subscriber: SubscriberInfo | null = null;
  componentView$: Observable<{ products: Product[], paymentMethods: PaymentMethods[] }>;

  form = new FormGroup({
    subscriberId: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required)
  });

  isTransactionInProgress: boolean = false;

  constructor(
    private addMoreDataService: AddMoreDataService,
    private subscriberService: SubscriberService,
    private toastController: ToastController,
    private platform: Platform,
    private iab: InAppBrowser,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    // Подписываемся на данные о подписчике из SubscriberService
    this.subscriberService.subscriber$.pipe(
      tap(subscriber => {
        this.subscriber = subscriber;
        this.form.get('subscriberId')?.setValue(subscriber?.id || null);
      }),
      // Загружаем продукты и методы оплаты при изменении подписчика
      switchMap(subscriber => {
        if (subscriber && subscriber.id) {
          return combineLatest([
            this.addMoreDataService.getProducts(subscriber.id),
            this.addMoreDataService.getPaymentMethods(subscriber.id)
          ]).pipe(
            map(([products, paymentMethods]) => ({ products, paymentMethods })),
            catchError(error => {
              showErrorToast(this.toastController, 'Failed to load data. Please try again later.');
              return of({ products: [], paymentMethods: [] });
            })
          );
        } else {
          return of({ products: [], paymentMethods: [] });
        }
      })
    ).subscribe(componentView => {
      this.componentView$ = of(componentView);
    });
  }

  public apply() {
    this.isTransactionInProgress = true;
    if (this.form.invalid) {
      showErrorToast(this.toastController, 'Form is invalid. Please check your entries.');
      this.isTransactionInProgress = false;
      return;
    }

    this.addMoreDataService.initiatePaymentProcess(this.form.value).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        showErrorToast(this.toastController, 'An error occurred during payment initialization. Please contact support.');
        this.isTransactionInProgress = false;
        return of(null);
      })
    ).subscribe((result: TransactionProcessResponse | null) => {
      if (result?.redirectRef) {
        this.openUrl(result.redirectRef);
      } else {
        showErrorToast(this.toastController, 'Payment Gateway error. Please contact support.');
      }
      this.isTransactionInProgress = false;
    });
  }

  public openUrl(url: string) {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // Если приложение на мобильном устройстве, открыть ссылку в системном браузере
      const browser = this.iab.create(url, '_system');
      browser.show();
    } else {
      // Если это браузерное окружение, открыть ссылку внутри WebView
      const browser = this.iab.create(url, '_blank');
      browser.show();
    }
  }
}
