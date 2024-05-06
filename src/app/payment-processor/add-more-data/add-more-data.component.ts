import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriberInfo } from '../../shared/model/subscriberInfo';
import { AddMoreDataService } from './add-more-data.service';
import { Product } from '../../shared/model/product';
import { Observable } from 'rxjs';
import { TransactionProcessResponse } from '../../shared/model/transactionProcessResponse';

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
    private addMoreDataService: AddMoreDataService
  ) { }

  ngOnInit() {
    this.initProducts();
  }

  private initProducts(): void {
    this.$products = this.addMoreDataService.getProducts(this.selectedSubscriber.id)
  }

  public apply() {
    this.addMoreDataService.initiatePaymentProcess(this.form.value).subscribe((result: TransactionProcessResponse) => {
      // window.location.href = result;
      this.addMoreDataService.postDataToExternalUrl(result.redirectRef, {
        param1: 'value1',
        param2: 'value2',
        // Другие параметры
      });

      this.setOpen(false);
    });
    console.log('form', this.form.value);
  }

  public setOpen(isOpen: boolean): void {
    this.form.get('subscriberId').setValue(this.selectedSubscriber.id);
    this.isModalOpen = isOpen;
  }
}
