import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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

  private primaryColor: string;

  constructor(private $LocalStorageService: LocalStorageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.chartData) {
      this.renderChart();
    }
  }

  ngOnInit(): void {
    this.primaryColor = this.$LocalStorageService.retrieve('primaryColor');
  }

  ngAfterViewInit() {
    this.renderChart();
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
            data: [this.chartData.remaining, this.chartData.used],
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
}
