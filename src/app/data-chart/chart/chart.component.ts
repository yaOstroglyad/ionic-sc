import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';
import { UsageInfo } from '../../shared/model/usageInfo';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnInit {
  @ViewChild('doughnutChartCanvas') private doughnutChartCanvas: ElementRef;

  @Input() chartData: UsageInfo;

  public usageLabel: string = '';
  private primaryColor: string;

  @Output() onChartSelected: EventEmitter<UsageInfo> = new EventEmitter<UsageInfo>();

  constructor(private translateService: TranslateService,
              private $LocalStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.primaryColor = this.$LocalStorageService.retrieve('primaryColor');
    console.log('this.primaryColor', this.primaryColor);
  }
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
          backgroundColor: [this.primaryColor, '#cdcdcd'],
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
