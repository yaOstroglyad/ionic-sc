import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { UsageInfo } from '../shared/model/usageInfo';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Package } from '../shared/model/package';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  public logoName = 'logo-esim.png';
  public selectedPackage: Package;
  public selectedUsage: UsageInfo;
  public $subscriber: BehaviorSubject<SubscriberInfo> = new BehaviorSubject<SubscriberInfo>(null);
  public $packages: Observable<Package[]>;
  public $subscribers: Observable<SubscriberInfo[]>;

  constructor(private homePageService: HomeService,
              private loginService: LoginService,
              private $LocalStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.logoName = this.$LocalStorageService.retrieve('logoName');
    this.initSubscriberUsage();
    this.initSubscribers();
  }

  private initSubscriberUsage(): void {
    this.$packages = this.$subscriber.pipe(
      switchMap((subscriber) => {
        return this.homePageService.getSubscriberUsage(subscriber.id).pipe(
          tap((packages) => {
            this.updateWidgets(packages[0]);
          })
        );
      })
    );
  }

  private initSubscribers(): void {
    this.$subscribers = this.homePageService.getSubscribers().pipe(
      tap((subscribers) => {
        const primarySubscriber = subscribers.find(s => s.isPrimary);
        if (!primarySubscriber) {
          console.warn('No primary subscriber!');
        }
        this.$subscriber.next(primarySubscriber);
      })
    );
  }

  public updateWidgets(selectedPackage: Package): void {
    this.selectedPackage = selectedPackage;
    this.selectedUsage = selectedPackage?.usages[0];
  }

  public updateUsage(usage: UsageInfo): void {
    this.selectedUsage = usage;
  }

  public updateView(): void {
    this.$subscriber.next({} as any);
  }

  public logout(): void {
    this.loginService.logout();
  }

  selectSubscriber(subscriber: SubscriberInfo): void {
    this.$subscriber.next(subscriber);
  }
}
