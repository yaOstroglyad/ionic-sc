import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UsageInfo } from '../shared/model/usageInfo';
import { Package } from '../shared/model/package';

@Component({
  selector: 'app-data-chart',
  templateUrl: 'data-chart.component.html',
  styleUrls: ['data-chart.component.scss']
})
export class DataChartComponent implements OnInit, OnChanges {
  @Input() package: Package;

  @Output() onUsageSelected: EventEmitter<UsageInfo> = new EventEmitter<UsageInfo>();

  public selectedChart: UsageInfo;

  selectChart(chartData: UsageInfo) {
    this.selectedChart = chartData;
    this.onUsageSelected.emit(chartData);
  }

  ngOnInit(): void {
    this.selectUsage(this.package?.usages[0]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.package) {
      this.selectUsage(changes.package.currentValue?.usages[0]);
    }
  }

  selectUsage(usage: UsageInfo): void {
    //TODO remove convert when BE will be ready
    if(usage) {
      this.selectedChart = this.convertUsage(usage);
    }
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

  convertUsage(usage: UsageInfo): UsageInfo {
    const BYTES_IN_MB = 1024 * 1024; // 1048576, двоичная система
    const BYTES_IN_GB = 1024 * 1024 * 1024; // 1073741824, двоичная система

    let newUsage = { ...usage };

    if (usage.total >= BYTES_IN_GB) {
      newUsage.unitType = "GB";
      newUsage.total = Math.round((usage.total / BYTES_IN_GB) * 10) / 10;
      newUsage.used = Math.round((usage.used / BYTES_IN_GB) * 10) / 10;
      newUsage.remaining = Math.round((usage.remaining / BYTES_IN_GB) * 10) / 10;
    } else if (usage.total >= BYTES_IN_MB) {
      newUsage.unitType = "MB";
      newUsage.total = Math.round((usage.total / BYTES_IN_MB) * 10) / 10;
      newUsage.used = Math.round((usage.used / BYTES_IN_MB) * 10) / 10;
      newUsage.remaining = Math.round((usage.remaining / BYTES_IN_MB) * 10) / 10;
    }

    return newUsage;
  }
}
