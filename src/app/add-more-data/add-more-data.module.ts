import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMoreDataComponent } from './add-more-data.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EGridModule } from '../shared/components/grid/e-grid.module';
import { EmptyStateModule } from '../shared/components/empty-state/empty-state.module';
import { LoadingComponent } from '../loading/loading.component';
import { AddMoreDataRoutingModule } from './add-more-data-routing.module';



@NgModule({
  declarations: [AddMoreDataComponent],
  imports: [
    CommonModule,
    EGridModule,
    IonicModule,
    TranslateModule,
    EmptyStateModule,
    ReactiveFormsModule,
    AddMoreDataRoutingModule,
    LoadingComponent
  ],
  exports: [AddMoreDataComponent]
})
export class AddMoreDataModule { }
