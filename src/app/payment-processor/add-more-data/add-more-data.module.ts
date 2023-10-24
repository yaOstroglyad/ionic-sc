import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMoreDataComponent } from './add-more-data.component';
import { EGridModule } from '../../shared/components/grid/e-grid.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateModule } from '../../shared/components/empty-state/empty-state.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddMoreDataComponent],
  imports: [
    CommonModule,
    EGridModule,
    IonicModule,
    TranslateModule,
    EmptyStateModule,
    ReactiveFormsModule
  ],
  exports: [AddMoreDataComponent]
})
export class AddMoreDataModule { }
