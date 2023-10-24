import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionProcessComponent } from './transaction-process.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [TransactionProcessComponent],
  imports: [CommonModule, IonicModule, TranslateModule]
})
export class TransactionProcessModule { }
