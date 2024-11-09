import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMoreDataService } from './add-more-data.service';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, filter, tap } from 'rxjs/operators';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Product } from '../shared/model/product';
import { PaymentMethods } from '../shared/model/paymentMethods';
import { showErrorToast } from '../shared/utils/toast.utils';
import { ToastController, Platform } from '@ionic/angular';
import { SubscriberService } from '../shared/services/subscriber.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TransactionProcessResponse } from '../shared/model/transactionProcessResponse';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss']
})
export class AddMoreDataComponent implements OnInit {
  public subscriber: SubscriberInfo | null = null;
  public componentView$: Observable<{ products: Product[], paymentMethods: PaymentMethods[] }>;
  private subscriberLoaded$ = new BehaviorSubject<boolean>(false);

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
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    // Следим за загрузкой подписчика и обновляем представление
    this.subscriberService.subscriber$.pipe(
      tap(subscriber => {
        this.subscriber = subscriber;
        this.form.get('subscriberId')?.setValue(subscriber?.id || null);
        this.subscriberLoaded$.next(true); // Помечаем, что подписчик загружен
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    // Ждём, пока `subscriberLoaded$` станет `true`, и затем загружаем данные для представления
    this.subscriberLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        switchMap(() => this.subscriberService.subscriber$),
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
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(componentView => {
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
    const browser = this.iab.create(
      url,
      this.platform.is('cordova') || this.platform.is('capacitor') ? '_system' : '_blank'
    );
    browser.show();
  }
}
