import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { DataChartModule } from '../data-chart/data-chart.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';
import { PaginationControlComponent } from '../pagination-control/pagination-control.component';
import { LoadingComponent } from '../loading/loading.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    DataChartModule,
    HomePageRoutingModule,
    TranslateModule,
    PageWrapperModule,
    PaginationControlComponent,
    LoadingComponent,
    IonicModule
  ],
	declarations: [HomePage]
})
export class HomePageModule {
}
