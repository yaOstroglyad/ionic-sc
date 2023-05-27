import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { DataChartModule } from '../data-chart/data-chart.module';
import { ExpirationDateInfoBoardModule } from '../expiration-date-info-board/expiration-date-info-board.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidgetsModule,
    DataChartModule,
    ExpirationDateInfoBoardModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
