import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EGridComponent } from './e-grid.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateModule } from '../empty-state/empty-state.module';



@NgModule({
  declarations: [EGridComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    EmptyStateModule
  ],
  exports: [EGridComponent]
})
export class EGridModule { }
