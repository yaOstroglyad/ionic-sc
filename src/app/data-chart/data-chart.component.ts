import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
import { TranslateService } from '@ngx-translate/core';

export enum DataUnit {
  gb = 'GB',
  kb = 'KB',
  mb = 'MB'
}

@Component({
  selector: 'app-data-chart',
  templateUrl: 'data-chart.component.html',
  styleUrls: ['data-chart.component.scss']
})
export class DataChartComponent implements AfterViewInit {
  // @ts-ignore
  @ViewChild('doughnutChartCanvas') private doughnutChartCanvas: ElementRef;

  @Input() totalDataAmount: number = 90;
  @Input() dataUnit: DataUnit = DataUnit.gb;
  @Input() currentUsage: number = 20;

  public usageLabel = this.translateService.instant(
    'data-chart.usage-label', {amount: this.totalDataAmount + ' ' +  this.dataUnit}
  );

  constructor(private translateService: TranslateService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = this.doughnutChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.currentUsage, this.totalDataAmount - this.currentUsage],
          backgroundColor: ['#f9a743', '#cdcdcd'],
          borderWidth: 0,
          borderRadius: 40 // Добавляем закругления
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
