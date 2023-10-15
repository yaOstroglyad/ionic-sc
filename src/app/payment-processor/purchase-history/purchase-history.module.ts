import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from './purchase-history.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateModule } from '../../shared/components/empty-state/empty-state.module';



@NgModule({
  declarations: [PurchaseHistoryComponent],
  imports: [CommonModule, IonicModule, TranslateModule, EmptyStateModule],
  exports: [PurchaseHistoryComponent]
})
export class PurchaseHistoryModule { }
