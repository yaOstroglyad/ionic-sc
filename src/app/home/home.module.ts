import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { DataChartModule } from '../data-chart/data-chart.module';
import { PaymentProcessorModule } from '../payment-processor/payment-processor.module';
import { BringYourIdeasModule } from '../bring-your-ideas/bring-your-ideas.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidgetsModule,
    DataChartModule,
    HomePageRoutingModule,
    PaymentProcessorModule,
    BringYourIdeasModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
