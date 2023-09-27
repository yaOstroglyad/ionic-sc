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
    //TODO remove when BE will be ready
    this.selectedChart = {
      ...usage,
      remaining: this.convertTo(usage.remaining, usage.unitType),
      total: this.convertTo(usage.total, usage.unitType),
      unitType: this.convertToType(usage.unitType)
    };
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

  convertTo(value: number, unitType: UsageInfo.UnitTypeDataEnum | UsageInfo.UnitTypeAmountEnum): number {
    if (unitType === UsageInfo.UnitTypeDataEnum.Byte) {
      return value / (1024 ** 3);
    } else if (unitType === UsageInfo.UnitTypeDataEnum.Mb) {
      return value / 1024;
    } else {
      return value;
    }
  }

  convertToType(unitType: UsageInfo.UnitTypeDataEnum | UsageInfo.UnitTypeAmountEnum): UsageInfo.UnitTypeDataEnum | UsageInfo.UnitTypeAmountEnum {
    if (unitType === UsageInfo.UnitTypeDataEnum.Byte) {
      return UsageInfo.UnitTypeDataEnum.Gb;
    } else if (unitType === UsageInfo.UnitTypeDataEnum.Mb) {
      return UsageInfo.UnitTypeDataEnum.Gb;
    } else {
      return unitType;
    }
  }
}
