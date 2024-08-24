import {
  Component, Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PurchaseHistoryService } from './purchase-history.service';
import { Observable } from 'rxjs';
import { PurchaseHistory } from '../../shared/model/purchaseHistory';
import { EmptyStateConfig, GridColumnConfig } from '../../shared/model/grid-configs';
import { PurchaseHistoryUtilsService } from './purchase-history-utils.service';
import { SubscriberInfo } from 'src/app/shared/model/subscriberInfo';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('customStatusTemplate') customStatusTemplate: TemplateRef<any>;

  @Input() selectedSubscriber: SubscriberInfo;

  public isModalOpen: boolean = false;
  public $purchaseHistory: Observable<PurchaseHistory[]>;
  public columnsConfig: GridColumnConfig[];
  public emptyStateConfig: EmptyStateConfig;

  constructor(private purchaseHistoryService: PurchaseHistoryService,
              private utilsService: PurchaseHistoryUtilsService) { }

  public setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
    if(this.isModalOpen) { this.updateView(); }
  }

  updateView(): void {
    if(this.selectedSubscriber) {
      this.emptyStateConfig = this.utilsService.getEmptyStateConfig();
      this.columnsConfig = this.utilsService.getColumnsConfig(this.customStatusTemplate);
      this.$purchaseHistory = this.purchaseHistoryService.getSubscriberPurchaseHistory(this.selectedSubscriber.id);
    } else {
      console.warn('no primary subscriber');
    }
  }
}
