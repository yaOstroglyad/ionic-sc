import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { UsageInfo } from '../shared/model/usageInfo';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Package } from '../shared/model/package';
import { LocalStorageService } from 'ngx-webstorage';
import { languages } from '../shared/consts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  public languages = [];
  public selectedLanguage = 'English';
  public logoName = 'logo-esim.png';
  public selectedPackage: Package;
  public selectedUsage: UsageInfo;
  public $activePackages: Observable<Package[]>;
  public $subscriber: BehaviorSubject<SubscriberInfo> = new BehaviorSubject<SubscriberInfo>(null);
  public $subscribers: Observable<SubscriberInfo[]>;

  constructor(public translate: TranslateService,
              private homePageService: HomeService,
              private loginService: LoginService,
              private $LocalStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.languages = Object.entries(languages).map(
      ([key, displayValue]) => ({ key, displayValue })
    );
    this.selectedLanguage = languages[this.$LocalStorageService.retrieve('language')];
    this.logoName = this.$LocalStorageService.retrieve('logoName');
    this.initSubscriberUsage();
    this.initSubscribers();
  }

  private initSubscriberUsage(): void {
    this.$activePackages = this.$subscriber.pipe(
      switchMap((subscriber: SubscriberInfo) => {
        this.$LocalStorageService.store('primarySubscriber', subscriber);
        return this.homePageService.getSubscriberUsage(subscriber.id).pipe(
          tap((packages: Package[]) => {
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
    this.$LocalStorageService.store('selectedPackage', selectedPackage);
    this.selectedPackage = selectedPackage;
    this.selectedUsage = selectedPackage?.usages[0];
  }

  public updateUsage(usage: UsageInfo): void {
    this.selectedUsage = usage;
  }

  public logout(): void {
    this.loginService.logout();
  }

  selectSubscriber(subscriber: SubscriberInfo): void {
    this.$subscriber.next(subscriber);
  }

  handleLangChange(event: any) {
    this.$LocalStorageService.store('language', event.detail.value);
    this.selectedLanguage = languages[event.detail.value];
    this.translate.use(event.detail.value);
  }
}
