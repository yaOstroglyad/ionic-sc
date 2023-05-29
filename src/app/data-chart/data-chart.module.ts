import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartComponent } from './data-chart.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    DataChartComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    DataChartComponent
  ]
})
export class DataChartModule { }
