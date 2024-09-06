import { Component, DestroyRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriberInfo } from '../../shared/model/subscriberInfo';
import { AddMoreDataService } from './add-more-data.service';
import { Product } from '../../shared/model/product';
import { Observable, of } from 'rxjs';
import { TransactionProcessResponse } from '../../shared/model/transactionProcessResponse';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss']
})
export class AddMoreDataComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() selectedSubscriber: SubscriberInfo;

  $products: Observable<Product[]>;

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
    private location: Location
  ) {
  }

  ngOnInit() {
    this.initProducts();

    //Manual process of route change detection
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['modal'] === 'add-more-data') {
        this.setOpen(true);
      }
    });
  }

  private initProducts(): void {
    this.$products = this.addMoreDataService.getProducts(this.selectedSubscriber.id);
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
        return of(null);
      })
    ).subscribe((result: TransactionProcessResponse) => {
      if (!result?.redirectRef) {
        return of(null);
      } else {
        this.addMoreDataService.postDataToExternalUrl(result.redirectRef, {
          transactionId: result.transactionId,
          transactionStatus: result.transactionStatus
        });

        this.isTransactionInProgress = false;
        this.setOpen(false);
      }
    });
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
