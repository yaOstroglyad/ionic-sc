import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';
import { UsageInfo } from '../../shared/model/usageInfo';
import UnitTypeEnum = UsageInfo.UnitTypeEnum;

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements  AfterViewInit {
  @ViewChild('doughnutChartCanvas') private doughnutChartCanvas: ElementRef;

  @Input() chartData: UsageInfo;

  public usageLabel: string = '';

  @Output() onChartSelected: EventEmitter<UsageInfo> = new EventEmitter<UsageInfo>();

  constructor(private translateService: TranslateService) {}

  ngAfterViewInit() {
    this.usageLabel = this.translateService.instant(
      'data-chart.usage-label', {amount: this.chartData.total + ' ' +  this.chartData.unitType}
    );
    this.renderChart();
  }

  renderChart() {
    const ctx = this.doughnutChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.chartData.used, this.chartData.remaining],
          backgroundColor: ['#f9a743', '#cdcdcd'],
          borderWidth: 0,
          borderRadius: 40
        }]
      },
      options: {
        cutout: '90%', // Adjust the value to specify the thickness (e.g., '40%', '70%')
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
