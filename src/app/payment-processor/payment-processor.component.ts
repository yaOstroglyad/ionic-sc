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

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentProcessorComponent implements OnInit, OnChanges {
  @ViewChild('customStatusTemplate') customStatusTemplate: TemplateRef<any>;

  @Input() packages: Package[];
  @Input() subscribers: SubscriberInfo[];
  @Output() packageSelect: EventEmitter<Package> = new EventEmitter<Package>;
  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>;

  public currentSelectedPackage: Package;
  public actionSheetButtons: ActionSheetButton[];

  ngOnChanges(changes: SimpleChanges): void {
    /** Active on new packages income **/
    if (changes.packages) {
      this.onPackageSelect(this.packages[0]);
      this.generateActionSheetButtons(changes.packages.currentValue);
    }
  }

  ngOnInit() {
    this.onPackageSelect(this.packages[0]);
    this.generateActionSheetButtons(this.packages);
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
    this.generateActionSheetButtons(this.packages);
    this.packageSelect.emit(selectedPackage);
  }

  private getRole(packageItem: Package): string {
    return this.currentSelectedPackage && this.currentSelectedPackage.name === packageItem.name ? 'selected' : ''
  }
}
