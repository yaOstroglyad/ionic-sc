import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Subject } from 'rxjs';
import { SubscriberInfo } from '../shared/model/subscriberInfo';
import { UsageInfo } from '../shared/model/usageInfo';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Package } from '../shared/model/package';
import { LocalStorageService } from 'ngx-webstorage';
import { languages } from '../shared/consts';
import { TranslateService } from '@ngx-translate/core';
import { Gesture, GestureConfig, GestureController, GestureDetail, ToastController } from '@ionic/angular';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public languages = [];
  public selectedLanguage = 'en';
  public logoName = 'logo-esim.png';
  public selectedPackage: Package;
  public selectedUsage: UsageInfo;
  public packages: Package[] = [];
  public $subscriber = new Subject<SubscriberInfo>();
  public subscriber: SubscriberInfo;
  public subscribers: SubscriberInfo[] = [];

  constructor(
    public translateService: TranslateService,
    private homePageService: HomeService,
    private loginService: LoginService,
    private $LocalStorageService: LocalStorageService,
    private gestureCtrl: GestureController,
    private toastController: ToastController,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.initializeLanguages();
    this.initializeSubscribers();
    this.initializeGesture();
    this.subscribeToSubscriber();
  }

  private initializeLanguages(): void {
    this.languages = Object.entries(languages).map(([key, displayValue]) => ({ key, displayValue }));
    this.selectedLanguage = this.$LocalStorageService.retrieve('language') || 'en';
    this.logoName = this.$LocalStorageService.retrieve('logoName');
    this.handleLangChange({ detail: { value: this.selectedLanguage } });
  }

  private initializeSubscribers(): void {
    this.homePageService.getSubscribers().pipe(
      tap(subscribers => {
        this.subscribers = subscribers;
        const primarySubscriber = subscribers.find(s => s.isPrimary);
        if (!primarySubscriber) {
          console.warn('No primary subscriber!');
        }
        this.$subscriber.next(primarySubscriber);
      })
    ).subscribe();
  }

  private subscribeToSubscriber(): void {
    this.$subscriber.pipe(
      tap(subscriber => {
        if (subscriber) {
          this.subscriber = subscriber;
          this.initPackages(subscriber.id);
        }
      })
    ).subscribe();
  }

  private initPackages(subscriberId: string): void {
    this.homePageService.getSubscriberUsage(subscriberId).pipe(
      tap(packages => {
        this.packages = packages;
        this.updateWidgets(this.packages[0] || {} as Package);
      })
    ).subscribe();
  }

  public updateWidgets(selectedPackage: Package): void {
    this.$LocalStorageService.store('selectedPackage', selectedPackage);
    this.selectedPackage = selectedPackage;
    this.selectedUsage = !isEmpty(selectedPackage) ? selectedPackage?.usages[0] : null;
  }

  public updateUsage(usage: UsageInfo): void {
    this.selectedUsage = usage;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loginService.logout();
  }

  public selectSubscriber(event: any): void {
    const newSubscriber = event instanceof CustomEvent ? event.detail.value : event;
    this.subscriber = newSubscriber;
    this.$subscriber.next(newSubscriber);
  }

  public handleLangChange(event: any): void {
    this.$LocalStorageService.store('language', event.detail.value);
    this.selectedLanguage = languages[event.detail.value];
    this.translateService.use(event.detail.value);
  }

  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(this.translateService.instant('common.copied', { property: 'ICCID' }));
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  public onPageChange(pageNumber: number): void {
    const selectedPackage = this.packages[pageNumber - 1];
    this.updateWidgets(selectedPackage);
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  private initializeGesture(): void {
    const options: GestureConfig = {
      el: this.el.nativeElement,
      gestureName: 'swipe',
      onEnd: ev => this.onSwipeEnd(ev),
      direction: 'x',
      threshold: 15
    };

    const gesture: Gesture = this.gestureCtrl.create(options);
    gesture.enable(true);
  }

  onSwipeEnd(ev: GestureDetail): void {
    const deltaX = ev.deltaX;
    deltaX > 0 ? this.handleSwipeRight() : this.handleSwipeLeft();
  }

  private handleSwipeRight(): void {
    this.handleSwipe(-1);
  }

  private handleSwipeLeft(): void {
    this.handleSwipe(1);
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
