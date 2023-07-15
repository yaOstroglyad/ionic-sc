import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubscriberUsage } from '../shared/model/subscriberUsage';
import { UsageInfo } from '../shared/model/usageInfo';

@Component({
  selector: 'app-data-chart',
  templateUrl: 'data-chart.component.html',
  styleUrls: ['data-chart.component.scss']
})
export class DataChartComponent implements OnInit {
  @Input() usage: SubscriberUsage;

  @Output() onChartSelected: EventEmitter<UsageInfo> = new EventEmitter<UsageInfo>();

  public selectedChart;

  constructor() {}
  selectChart(chartData: UsageInfo) {
    this.selectedChart = chartData;
    this.onChartSelected.emit(chartData);
  }

  ngOnInit(): void {
    this.selectedChart = this.usage.data[0];
  }
  getColumnClass(dataLength: number): string {
    switch (true) {
      case dataLength === 2:
        return 'col-lg-6 col-md-12 col-sm-12';
      case dataLength === 3:
        return 'col-lg-4 col-md-4 col-sm-12';
      case dataLength === 4:
        return 'col-lg-3 col-md-12 col-sm-12';
      default:
        return 'col-12';
    }
  }
}
