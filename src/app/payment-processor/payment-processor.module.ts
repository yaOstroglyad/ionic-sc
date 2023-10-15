import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProcessorComponent } from './payment-processor.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';

@NgModule({
  declarations: [
    PaymentProcessorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PurchaseHistoryModule
  ],
  exports: [
    PaymentProcessorComponent
  ]
})
export class PaymentProcessorModule { }
