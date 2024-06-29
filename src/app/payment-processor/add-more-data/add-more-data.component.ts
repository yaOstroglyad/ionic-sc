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

  constructor(
    private addMoreDataService: AddMoreDataService,
    private destroyRef: DestroyRef,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.initProducts();
  }

  private initProducts(): void {
    this.$products = this.addMoreDataService.getProducts(this.selectedSubscriber.id);
  }

  public apply() {
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

        this.setOpen(false);
      }
    });
  }

  public setOpen(isOpen: boolean): void {
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
