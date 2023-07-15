import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { combineLatest, map, Observable, of } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { SubscriberUsage } from '../shared/model/subscriberUsage';
import { UsageInfo } from '../shared/model/usageInfo';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //TODO it in future
  private toggle: boolean = true;

  public selectedChart: UsageInfo;
  public $subscriber: Observable<{
    info: SubscriberInfo,
    usage: SubscriberUsage
  }>;
  constructor(private homePageService: HomeService, private loginService: LoginService) {}

  ngOnInit(): void {
    //remove it when integration be ready
    // this.$subscriber = of({info: {}, usage: {data: []}} as any);
    // un commit it on integration step
    this.initSubscriberData();
  }

  private initSubscriberData(): void {
    this.$subscriber = combineLatest([
      this.homePageService.getSubscriber(),
      this.homePageService.getSubscriberUsage()
    ]).pipe(
      map(([info, usage]) => {
        return {
          info,
          usage
        }
      }),
      tap(result => {
        this.selectedChart = result.usage.data && result.usage.data[0];
      })
    );
  }

  public updateWidgets(chartData: UsageInfo): void {
    this.selectedChart = chartData;
  }

  public updateView(): void {
    this.toggle ? this.initSubscriberData() : this.$subscriber = of({info: {}, usage: {data: []}} as any);
    this.toggle = !this.toggle;
  }

  public logout(): void {
    this.loginService.logout();
  }
}
