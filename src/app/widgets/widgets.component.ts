import { Component, Input, OnInit } from '@angular/core';
import { UsageInfo } from '../shared/model/usageInfo';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {

  // @ts-ignore
  @Input() selectedChart: UsageInfo;

  constructor() { }

  ngOnInit() {}

}
