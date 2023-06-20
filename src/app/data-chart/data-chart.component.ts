import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubscriberUsage } from '../shared/model/subscriberUsage';
import { UsageInfo } from '../shared/model/usageInfo';

@Component({
  selector: 'app-data-chart',
  templateUrl: 'data-chart.component.html',
  styleUrls: ['data-chart.component.scss']
})
export class DataChartComponent {
  @Input() usage: SubscriberUsage;

  @Output() onChartSelected: EventEmitter<UsageInfo> = new EventEmitter<UsageInfo>();
  constructor() {}
}
