import {
  Component, OnInit, AfterViewInit, TemplateRef, ViewChild
} from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { PurchaseHistoryUtilsService } from './purchase-history-utils.service';
import { SubscriberService } from '../shared/services/subscriber.service';
import { SubscriberInfo } from 'src/app/shared/model/subscriberInfo';
import { PurchaseHistory, PurchaseHistoryStatus } from '../shared/model/purchaseHistory';
import { EmptyStateConfig, GridColumnConfig } from '../shared/model/grid-configs';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('customStatusTemplate') customStatusTemplate: TemplateRef<any>;

  protected readonly PurchaseHistoryStatus = PurchaseHistoryStatus;

  private subscriberLoaded$ = new BehaviorSubject<boolean>(false);
  public purchaseHistory$: Observable<PurchaseHistory[]>;
  public emptyStateConfig: EmptyStateConfig;
  public columnsConfig: GridColumnConfig[];
  public subscriber: SubscriberInfo | null = null;

  constructor(
    private purchaseHistoryService: PurchaseHistoryService,
    private utilsService: PurchaseHistoryUtilsService,
    private subscriberService: SubscriberService
  ) {}

  public ngOnInit(): void {
    this.subscriberService.subscriber$.subscribe(subscriber => {
      this.subscriber = subscriber;
      this.subscriberLoaded$.next(true); // Помечаем, что подписчик загружен
    });
  }

  public ngAfterViewInit(): void {
    this.subscriberLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        switchMap(() => this.subscriberService.subscriber$)
      )
      .subscribe(subscriber => {
        this.subscriber = subscriber;
        this.updateView();
      });
  }

  public updateView(): void {
    if (this.subscriber) {
      this.emptyStateConfig = this.utilsService.getEmptyStateConfig();
      this.columnsConfig = this.utilsService.getColumnsConfig(this.customStatusTemplate);
      this.purchaseHistory$ = this.purchaseHistoryService.getSubscriberPurchaseHistory(this.subscriber.id);
    } else {
      console.warn('No primary subscriber available.');
    }
  }
}
