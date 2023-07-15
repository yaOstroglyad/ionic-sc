import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartComponent } from './data-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from './chart/chart.module';
import { UtilsModule } from '../shared/utils/utils.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    DataChartComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ChartModule,
    UtilsModule,
    IonicModule
  ],
  exports: [
    DataChartComponent
  ]
})
export class DataChartModule { }
