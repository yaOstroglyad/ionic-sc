import { Injectable, TemplateRef } from '@angular/core';
import { GridColumnType } from '../shared/model/grid-configs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryUtilsService {

  constructor() { }

  public getColumnsConfig(statusTemplateRef: TemplateRef<any>) {
    return [
      {
        name: 'payment-processor.review-order-history.packageName',
        key: 'name',
        type: GridColumnType.text,
      },
      {
        name: 'payment-processor.review-order-history.purchaseAt',
        key: 'purchasedAt',
        type: GridColumnType.date,
      },
      {
        name: 'payment-processor.review-order-history.packageStatus',
        key: 'status',
        type: GridColumnType.custom,
        htmlTemplate: statusTemplateRef,
        columnHeaderClassName: 'text-center',
        columnClassName: 'text-center'
      }
    ]
  }
  public getEmptyStateConfig() {
    return {
      title: 'common.no-data-in-list',
      imgUrl: 'assets/images/no-data.png'
    }
  }
}
