import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import { Package } from '../shared/model/package';
import { ActionSheetButton } from '@ionic/angular';
import { SubscriberInfo } from '../shared/model/subscriberInfo';


// get all products by subscriber
// /api/v1/self-care/subscriber/{id}/products
// [{"id":"UUID","name":"Product"}]

// start payment process
// - transactionId
// - transactionStatus
// - redirectRef
// api/v1/self-care/product/purchase
// type: POST
// body: { productId, subscriberId }

// in menu, you have transaction

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentProcessorComponent implements OnInit, OnChanges {
  @ViewChild('customStatusTemplate') customStatusTemplate: TemplateRef<any>;

  @Input() products: Package[];
  @Input() subscribers: SubscriberInfo[];
  @Output() packageSelect: EventEmitter<Package> = new EventEmitter<Package>;
  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>;

  public currentSelectedPackage: Package;
  public actionSheetButtons: ActionSheetButton[];

  ngOnChanges(changes: SimpleChanges): void {
    /** Active on new packages income **/
    if (changes.packages) {
      this.onPackageSelect(this.products[0]);
      this.generateActionSheetButtons(changes.packages.currentValue);
    }
  }

  ngOnInit() {
    this.onPackageSelect(this.products[0]);
    this.generateActionSheetButtons(this.products);
  }

  private generateActionSheetButtons(packages: Package[]): void {
    this.actionSheetButtons = [];

    packages.forEach((packageItem: Package) => {
      this.actionSheetButtons.push({
        text: packageItem.name,
        role: this.getRole(packageItem),
        handler: () => this.onPackageSelect(packageItem)
      });
    });

    this.actionSheetButtons.push({
      text: 'Cancel',
      role: 'cancel'
    });
  }

  private onPackageSelect(selectedPackage: Package): void {
    this.currentSelectedPackage = selectedPackage;
    /** menu should be regenerated for role update **/
    this.generateActionSheetButtons(this.products);
    this.packageSelect.emit(selectedPackage);
  }

  private getRole(packageItem: Package): string {
    return this.currentSelectedPackage && this.currentSelectedPackage.name === packageItem.name ? 'selected' : '';
  }
}
