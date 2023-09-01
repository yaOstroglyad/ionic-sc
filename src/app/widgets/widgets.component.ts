import { Component, Input } from '@angular/core';
import { UsageInfo } from '../shared/model/usageInfo';
import { Package } from '../shared/model/package';
import { SubscriberInfo } from '../shared/model/subscriberInfo';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent {
  @Input() selectedPackage: Package;
  @Input() selectedUsage: UsageInfo;
  @Input() selectedSubscriber: SubscriberInfo;

  protected readonly UsageInfo = UsageInfo;
}
