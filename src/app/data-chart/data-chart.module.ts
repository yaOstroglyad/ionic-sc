import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartComponent } from './data-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from './chart/chart.module';
import { IonicModule } from '@ionic/angular';
import { EmptyStateModule } from '../shared/components/empty-state/empty-state.module';



@NgModule({
  declarations: [
    DataChartComponent
  ],
	imports: [
		CommonModule,
		TranslateModule,
		ChartModule,
		IonicModule,
		EmptyStateModule
	],
  exports: [
    DataChartComponent
  ]
})
export class DataChartModule { }
