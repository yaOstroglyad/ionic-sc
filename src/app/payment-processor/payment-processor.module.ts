import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProcessorComponent } from './payment-processor.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PaymentProcessorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    PaymentProcessorComponent
  ]
})
export class PaymentProcessorModule { }
