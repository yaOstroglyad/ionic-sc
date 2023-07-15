import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';
import { UsageInfo } from '../../shared/model/usageInfo';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('doughnutChartCanvas') private doughnutChartCanvas: ElementRef;

  chart: any;

  @Input() chartData: UsageInfo;

  public usageLabel: string = '';
  private primaryColor: string;

  constructor(private translateService: TranslateService,
              private $LocalStorageService: LocalStorageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.chartData) {
      this.renderChart();
      this.updateLabel();
    }
  }

  ngOnInit(): void {
    this.primaryColor = this.$LocalStorageService.retrieve('primaryColor');
  }

  ngAfterViewInit() {
    this.renderChart();
    this.updateLabel();
  }

  renderChart() {
    const canvas = this.doughnutChartCanvas?.nativeElement;
    const context = canvas?.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);

    if(this.chart) {
      this.chart.destroy();
    }

    if(context) {
      this.chart = new Chart(context, {
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

  private updateLabel(): void {
    this.usageLabel = this.translateService.instant(
      'data-chart.usage-label', {amount: this.chartData.total + ' ' +  this.chartData.unitType}
    );
  }
}
