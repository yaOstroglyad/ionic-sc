import { Component, DestroyRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriberInfo } from '../../shared/model/subscriberInfo';
import { AddMoreDataService } from './add-more-data.service';
import { Product } from '../../shared/model/product';
import { Observable, takeUntil } from 'rxjs';
import { TransactionProcessResponse } from '../../shared/model/transactionProcessResponse';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss'],
})
export class AddMoreDataComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() selectedSubscriber: SubscriberInfo;
  $products: Observable<Product[]>;

  form = new FormGroup({
    subscriberId: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required),
  });
  isModalOpen: boolean = false;

  constructor(
    private addMoreDataService: AddMoreDataService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit() {
    this.initProducts();
  }

  private initProducts(): void {
    this.$products = this.addMoreDataService.getProducts(this.selectedSubscriber.id)
  }

  public apply() {
    this.addMoreDataService.initiatePaymentProcess(this.form.value).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result: TransactionProcessResponse) => {
      this.addMoreDataService.postDataToExternalUrl(result.redirectRef, {
        transactionId: result.transactionId,
        transactionStatus: result.transactionStatus,
      });

      this.setOpen(false);
    });
  }

  public setOpen(isOpen: boolean): void {
    this.form.get('subscriberId').setValue(this.selectedSubscriber.id);
    this.isModalOpen = isOpen;
  }
}
