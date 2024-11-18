import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMoreDataService } from './add-more-data.service';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, catchError, switchMap, filter, tap } from 'rxjs/operators';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { Product } from '../shared/model/product';
import { PaymentMethods } from '../shared/model/paymentMethods';
import { Platform } from '@ionic/angular';
import { SubscriberService } from '../shared/services/subscriber.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TransactionProcessResponse } from '../shared/model/transactionProcessResponse';
import { showToast, ToastColor } from '../shared/utils/toast.utils';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss']
})
export class AddMoreDataComponent implements OnInit {
  public subscriber: SubscriberInfo | null = null;
  public componentView$: Observable<{ products: Product[], paymentMethods: PaymentMethods[] }>;
  private subscriberLoaded$ = new BehaviorSubject<boolean>(false);

  form: FormGroup<{
    subscriberId: FormControl<string | null>;
    productId: FormControl<string | null>;
    paymentStrategy?: FormControl<string | null>
  }> = new FormGroup({
    subscriberId: new FormControl<string | null>(null, Validators.required),
    productId: new FormControl<string | null>(null, Validators.required)
  });

  isTransactionInProgress: boolean = false;

  constructor(
    private addMoreDataService: AddMoreDataService,
    private subscriberService: SubscriberService,
    private platform: Platform,
    private iab: InAppBrowser,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.subscriberService.subscriber$.pipe(
      tap(subscriber => {
        this.subscriber = subscriber;
        this.form.get('subscriberId')?.setValue(subscriber?.id || null);
        this.subscriberLoaded$.next(true);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

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
                showToast({
                  message: 'Failed to load data. Please try again later.',
                  color: ToastColor.danger
                });
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
        if (componentView.paymentMethods.length > 0) {
          this.form.addControl('paymentStrategy', new FormControl(null, Validators.required));
        }
      });
  }

  public apply() {
    this.isTransactionInProgress = true;
    if (this.form.invalid) {
      showToast({
        message: 'Form is invalid. Please check your entries.',
        color: ToastColor.danger
      });
      this.isTransactionInProgress = false;
      return;
    }

    const requestPayload = {
      ...this.form.value,
      paymentStrategy: this.form.get('paymentStrategy')?.value || null
    };

    this.addMoreDataService.initiatePaymentProcess(requestPayload).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        showToast({
          message: 'An error occurred during payment initialization. Please contact support.',
          color: ToastColor.danger
        });
        this.isTransactionInProgress = false;
        return of(null);
      })
    ).subscribe((result: TransactionProcessResponse | null) => {
      if (result?.redirectRef) {
        this.openUrl(result.redirectRef);
      } else {
        showToast({
          message: 'Payment Gateway error. Please contact support.',
          color: ToastColor.danger
        });
      }
      this.isTransactionInProgress = false;
    });
  }

  public openUrl(url: string): void {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      const browser = this.iab.create(url, '_system');
      browser.show();
    } else {
      this.createTagAndClickAndRemove(url);
    }
  }

  // workaround for Safari
  public createTagAndClickAndRemove(url: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
