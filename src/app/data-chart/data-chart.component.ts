import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-chart',
  templateUrl: 'data-chart.component.html',
  styleUrls: ['data-chart.component.scss']
})
export class DataChartComponent {

  @Input() isData = true;
  constructor() {}
}
