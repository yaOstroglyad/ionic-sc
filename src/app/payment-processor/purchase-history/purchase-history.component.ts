import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PurchaseHistoryService } from './purchase-history.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { PurchaseHistory } from '../../shared/model/purchaseHistory';
import { EmptyStateConfig, GridColumnConfig } from '../../shared/model/grid-configs';
import { PurchaseHistoryUtilsService } from './purchase-history-utils.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('customStatusTemplate') customStatusTemplate: TemplateRef<any>;

  public isModalOpen: boolean = false;
  public $purchaseHistory: Observable<PurchaseHistory[]>;
  public columnsConfig: GridColumnConfig[];
  public emptyStateConfig: EmptyStateConfig;

  constructor(private purchaseHistoryService: PurchaseHistoryService,
              private $LocalStorageService: LocalStorageService,
              private utilsService: PurchaseHistoryUtilsService) { }

  public setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
    if(this.isModalOpen) { this.updateView(); }
  }

  updateView(): void {
    const subscriber = this.$LocalStorageService.retrieve('primarySubscriber');
    if(subscriber) {
      this.emptyStateConfig = this.utilsService.getEmptyStateConfig();
      this.columnsConfig = this.utilsService.getColumnsConfig(this.customStatusTemplate);
      this.$purchaseHistory = this.purchaseHistoryService.getSubscriberPurchaseHistory(subscriber.id);
    } else {
      console.warn('no primary subscriber');
    }
  }
}
