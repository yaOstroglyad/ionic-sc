import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { UsageInfo } from '../shared/model/usageInfo';
import { Package } from '../shared/model/package';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { GestureController, GestureDetail } from '@ionic/angular';
import { SubscriberService } from '../shared/services/subscriber.service';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginService } from '../login/login.service';
import { languages } from '../shared/consts';
import { isEmpty } from 'lodash';
import { delay } from 'rxjs';
import { showToast } from '../shared/utils/toast.utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, OnDestroy {
  public subscriber: SubscriberInfo | null = null;
  public subscribers: SubscriberInfo[] = [];
  public packages: Package[] = [];
  public selectedPackage: Package;
  public selectedUsage: UsageInfo;
  public languages = [];
  public selectedLanguage = 'en';
  public logoName = 'logo-esim.png';
  public isLoading = true;

  constructor(
    public translateService: TranslateService,
    private subscriberService: SubscriberService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private gestureCtrl: GestureController,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    console.log('home destroy');
  }

  ngOnInit(): void {
    this.initializeLanguages();
    this.initializeSubscriber();
    this.initializeGesture();
  }

  private initializeLanguages(): void {
    this.languages = Object.entries(languages).map(([key, displayValue]) => ({key, displayValue}));
    this.selectedLanguage = this.localStorageService.retrieve('language') || 'en';
    this.logoName = this.localStorageService.retrieve('logoName');
    this.handleLangChange({detail: {value: this.selectedLanguage}});
  }

  private initializeSubscriber(): void {
    this.subscriberService.subscriber$
      .pipe(
        delay(1000),
        tap(subscriber => {
          this.subscriber = subscriber;
          this.subscribers = this.subscriberService.subscribers;
          if (subscriber) {
            this.initPackages(subscriber.id);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private initPackages(subscriberId: string): void {
    this.subscriberService.getSubscriberUsage(subscriberId).pipe(
      tap(packages => {
        this.packages = packages;
        this.updateWidgets(this.packages[0] || {} as Package);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  public updateWidgets(selectedPackage: Package): void {
    this.localStorageService.store('selectedPackage', selectedPackage);
    this.selectedPackage = selectedPackage;
    this.selectedUsage = !isEmpty(selectedPackage) ? selectedPackage?.usages[0] : null;
  }

  public updateUsage(usage: UsageInfo): void {
    this.selectedUsage = usage;
  }

  public logout(): void {
    this.loginService.logout();
  }

  public selectSubscriber(event: any): void {
    this.subscriber = event instanceof CustomEvent ? event.detail.value : event;
    this.initializeSubscriber();
  }

  public handleLangChange(event: any): void {
    this.localStorageService.store('language', event.detail.value);
    this.selectedLanguage = languages[event.detail.value];
    this.translateService.use(event.detail.value);
  }

  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      return showToast({
        message: this.translateService.instant('common.copied', {property: 'ICCID'})
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  public onPageChange(pageNumber: number): void {
    const selectedPackage = this.packages[pageNumber - 1];
    this.updateWidgets(selectedPackage);
  }

  private initializeGesture(): void {
    const gesture = this.gestureCtrl.create({
      el: document.querySelector('ion-content'),
      gestureName: 'swipe',
      onEnd: ev => this.onSwipeEnd(ev),
      direction: 'x',
      threshold: 15
    });
    gesture.enable(true);
  }

  onSwipeEnd(ev: GestureDetail): void {
    ev.deltaX > 0 ? this.handleSwipe(-1) : this.handleSwipe(1);
  }

  private handleSwipe(direction: number): void {
    if (this.subscribers.length > 1) {
      const currentIndex = this.subscribers.findIndex(sub => sub.id === this.subscriber?.id);
      if (currentIndex !== -1) {
        const newIndex = (currentIndex + direction + this.subscribers.length) % this.subscribers.length;
        this.selectSubscriber(this.subscribers[newIndex]);
      }
    }
  }
}
