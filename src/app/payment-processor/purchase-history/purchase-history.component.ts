import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PurchaseHistoryService } from './purchase-history.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { PurchaseHistory } from '../../shared/model/purchaseHistory';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  public $purchaseHistory: Observable<PurchaseHistory[]>;

  constructor(private purchaseHistoryService: PurchaseHistoryService,
              private $LocalStorageService: LocalStorageService) { }

  ngOnInit() {
    const subscriber = this.$LocalStorageService.retrieve('primarySubscriber');
    if(subscriber) {
      this.$purchaseHistory = this.purchaseHistoryService.getSubscriberPurchaseHistory(subscriber.id);
    } else {
      console.warn('no primary subscriber');
    }

  }

  public confirm() {
    this.modal.dismiss({}, 'confirm');
  }
}
