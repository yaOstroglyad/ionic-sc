import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { SubscriberInfo } from '../../shared/model/subscriberInfo';
import { Package } from '../../shared/model/package';
import { AddMoreDataService } from './add-more-data.service';

@Component({
  selector: 'app-add-more-data',
  templateUrl: './add-more-data.component.html',
  styleUrls: ['./add-more-data.component.scss'],
})
export class AddMoreDataComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() products: Package[];
  @Input() subscribers: SubscriberInfo[];

  form = new FormGroup({
    phoneNumber: new FormControl(null, Validators.required),
    packageId: new FormControl(null, Validators.required),
    extension: new FormControl(null, Validators.required),
  });
  isModalOpen: boolean = false;

  constructor(
    private $LocalStorageService: LocalStorageService,
    private addMoreDataService: AddMoreDataService
  ) { }

  ngOnInit() {}

  public apply() {
    const selectedPackage = this.$LocalStorageService.retrieve('selectedPackage') as Package;
    this.addMoreDataService.initiatePaymentProcess(selectedPackage.id, this.form.value).subscribe(result => {
      // window.location.href = result;
      this.addMoreDataService.postDataToExternalUrl(result, {
        param1: 'value1',
        param2: 'value2',
        // Другие параметры
      });

      this.setOpen(false);
    });
    console.log('form', this.form.value);
  }

  public setOpen(isOpen: boolean): void {
    const primarySubscriber = this.$LocalStorageService.retrieve('primarySubscriber') as SubscriberInfo;
    const selectedPackage = this.$LocalStorageService.retrieve('selectedPackage') as Package;
    this.form.get('phoneNumber').setValue(primarySubscriber.msisdn);
    this.form.get('packageId').setValue(selectedPackage.id);
    this.isModalOpen = isOpen;
  }
}
