import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from './purchase-history.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PurchaseHistoryRoutingModule } from './purchase-history-routing.module';
import { EmptyStateModule } from '../shared/components/empty-state/empty-state.module';
import { EGridModule } from '../shared/components/grid/e-grid.module';


@NgModule({
  declarations: [PurchaseHistoryComponent],
  imports: [CommonModule, IonicModule, TranslateModule, EmptyStateModule, EGridModule, EGridModule, PurchaseHistoryRoutingModule],
  exports: [PurchaseHistoryComponent]
})
export class PurchaseHistoryModule {
}
