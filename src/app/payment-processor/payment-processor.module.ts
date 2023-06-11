import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProcessorComponent } from './payment-processor.component';



@NgModule({
  declarations: [
    PaymentProcessorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentProcessorComponent
  ]
})
export class PaymentProcessorModule { }
