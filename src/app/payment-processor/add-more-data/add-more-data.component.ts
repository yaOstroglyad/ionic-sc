import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, Platform, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriberInfo } from '../../shared/model/subscriberInfo';
import { AddMoreDataService } from './add-more-data.service';
import { Product } from '../../shared/model/product';
import { Observable, of, combineLatest } from 'rxjs';
import { TransactionProcessResponse } from '../../shared/model/transactionProcessResponse';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PaymentMethods } from '../../shared/model/paymentMethods';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss']
})
export class AddMoreDataComponent implements OnInit, AfterViewInit {
  @ViewChild(IonModal, { static: false }) modal: IonModal;
  @Input() selectedSubscriber: SubscriberInfo;

  componentView$: Observable<{ products: Product[], paymentMethods: PaymentMethods[] }>;

  form = new FormGroup({
    subscriberId: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required)
  });

  isModalOpen: boolean = false;
  isTransactionInProgress: boolean = false;

  constructor(
    private addMoreDataService: AddMoreDataService,
    private destroyRef: DestroyRef,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private iab: InAppBrowser,
    private platform: Platform,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.modal.didDismiss.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isTransactionInProgress = false;
    });
  }

  ngOnInit() {
    // Инициализация componentView$, которая объединяет загрузку продуктов и методов оплаты
    this.componentView$ = combineLatest([
      this.addMoreDataService.getProducts(this.selectedSubscriber.id),
      this.addMoreDataService.getPaymentMethods(this.selectedSubscriber.id)
    ]).pipe(
      map(([products, paymentMethods]) => ({ products, paymentMethods }))
    );

    // Обработка изменений в маршрутах
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['modal'] === 'add-more-data') {
        this.setOpen(true);
      }
    });
  }

  public apply() {
    this.isTransactionInProgress = true;
    if (this.form.invalid) {
      this.showErrorToast('Form is invalid. Please contact support.');
      return;
    }

    this.addMoreDataService.initiatePaymentProcess(this.form.value).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        this.showErrorToast('An error occurred during payment initialization. Please contact support.');
        this.isTransactionInProgress = false;
        this.cdr.detectChanges();
        return of(null);
      })
    ).subscribe((result: TransactionProcessResponse) => {
      if (!result?.redirectRef) {
        this.isTransactionInProgress = false;
        this.cdr.detectChanges();
        return of(null);
      } else {
        this.openUrl(result.redirectRef);
        this.isTransactionInProgress = false;
        this.cdr.detectChanges();
        this.setOpen(false);
      }
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

  public setOpen(isOpen: boolean): void {
    if (isOpen) {
      const newUrl = this.router.createUrlTree([], {
        relativeTo: this.router.routerState.root,
        queryParams: { modal: 'add-more-data', subscriberId: this.selectedSubscriber.id }
      }).toString();
      this.location.go(newUrl);
    } else {
      this.location.go('/home');
    }

    this.form.get('subscriberId').setValue(this.selectedSubscriber.id);
    this.isModalOpen = isOpen;
  }

  private async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }
}
