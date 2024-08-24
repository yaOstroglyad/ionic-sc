import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { DataChartModule } from '../data-chart/data-chart.module';
import { PaymentProcessorModule } from '../payment-processor/payment-processor.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '../loading/loading.component';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';
import { PaginationControlComponent } from '../pagination-control/pagination-control.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidgetsModule,
    DataChartModule,
    HomePageRoutingModule,
    PaymentProcessorModule,
    TranslateModule,
    PageWrapperModule,
    PaginationControlComponent
  ],
  declarations: [HomePage, LoadingComponent]
})
export class HomePageModule {
}
