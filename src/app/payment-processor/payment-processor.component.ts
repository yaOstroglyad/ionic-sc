import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Package } from '../shared/model/package';
import { ActionSheetButton } from '@ionic/angular';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentProcessorComponent implements OnInit, OnChanges {
  @Input() activePackages: Package[];
  @Input() selectedSubscriber: SubscriberInfo;

  @Output() packageSelect: EventEmitter<Package> = new EventEmitter<Package>();
  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>();

  public currentSelectedPackage: Package;
  public actionSheetButtons: ActionSheetButton[];

  constructor(
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef // Добавлен ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    /** Active on new packages income **/
    if (changes.activePackages && !changes.activePackages.isFirstChange()) {
      this.onPackageSelect(this.activePackages[0]);
      this.generateActionSheetButtons(changes.activePackages.currentValue);
    }
  }

  ngOnInit() {
    this.onPackageSelect(this.activePackages[0]);
    this.generateActionSheetButtons(this.activePackages);
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
      text: this.translateService.instant('common.cancel'),
      role: 'cancel'
    });
  }

  private onPackageSelect(selectedPackage: Package): void {
    this.currentSelectedPackage = selectedPackage;
    /** menu should be regenerated for role update **/
    this.generateActionSheetButtons(this.activePackages);
    this.packageSelect.emit(selectedPackage);
    this.cdr.detectChanges();
  }

  private getRole(packageItem: Package): string {
    return this.currentSelectedPackage && this.currentSelectedPackage.name === packageItem.name ? 'selected' : '';
  }
}
