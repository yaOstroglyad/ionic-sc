import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartComponent } from './data-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from './chart/chart.module';



@NgModule({
  declarations: [
    DataChartComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ChartModule
  ],
  exports: [
    DataChartComponent
  ]
})
export class DataChartModule { }
