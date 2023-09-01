import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Package } from '../shared/model/package';
import { ActionSheetButton } from '@ionic/angular';

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentProcessorComponent implements OnInit, OnChanges {
  currentSelectedPackage: Package;
  public actionSheetButtons: ActionSheetButton[];

  @Input() packages: Package[];
  @Output() packageSelect: EventEmitter<Package> = new EventEmitter<Package>;
  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>;

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

  generateActionSheetButtons(packages: Package[]): void {
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

  onPackageSelect(selectedPackage: Package): void {
    this.currentSelectedPackage = selectedPackage;
    /** menu should be regenerated for role update **/
    this.generateActionSheetButtons(this.packages);
    this.packageSelect.emit(selectedPackage);
  }

  getRole(packageItem: Package): string {
    return this.currentSelectedPackage && this.currentSelectedPackage.name === packageItem.name ? 'selected' : ''
  }

  addData(): void {
    this.onDataAdd.emit({});
  }
}
