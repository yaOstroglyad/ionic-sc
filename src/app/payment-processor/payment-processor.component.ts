import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentProcessorComponent implements OnInit, OnChanges {
  @Input() activePackages: Package[] = [];
  @Input() selectedSubscriber: SubscriberInfo;
  @Input() selectedPackage: Package;  // Ваш новый input

  @Output() packageSelect: EventEmitter<Package> = new EventEmitter<Package>();
  @Output() onDataAdd: EventEmitter<any> = new EventEmitter<any>();

  public currentSelectedPackage: Package;
  public actionSheetButtons: ActionSheetButton[] = [];
  public displayName: string;

  constructor(
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activePackages && !changes.activePackages.isFirstChange()) {
      if (this.activePackages && this.activePackages.length) {
        this.onPackageSelect(this.activePackages[0]);
        this.generateActionSheetButtons(changes.activePackages.currentValue);
      }
    }

    if (changes.selectedPackage && !changes.selectedPackage.isFirstChange()) {
      if (this.selectedPackage && this.activePackages.length) {
        this.onPackageSelect(this.selectedPackage);
      }
    }
  }

  ngOnInit() {
    if (this.activePackages && this.activePackages.length) {
      this.onPackageSelect(this.activePackages[0]);
      this.generateActionSheetButtons(this.activePackages);
    }

    if (this.selectedPackage) {
      this.onPackageSelect(this.selectedPackage);
    }
  }

  private generateActionSheetButtons(packages: Package[]): void {
    this.actionSheetButtons = [];
    packages.forEach((packageItem: Package) => {
      this.actionSheetButtons.push({
        text: packageItem.name + ` (${packageItem.status})`,
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
    this.displayName = this.getDisplayName(selectedPackage.name);
    this.generateActionSheetButtons(this.activePackages);
    this.packageSelect.emit(selectedPackage);
    this.cdr.detectChanges();
  }

  private getDisplayName(name: string): string {
    const maxLength = 15;
    return name.length > maxLength ? this.translateService.instant('widgets.package') : name;
  }

  private getRole(packageItem: Package): string {
    return this.currentSelectedPackage && this.currentSelectedPackage.name === packageItem.name ? 'selected' : '';
  }
}
