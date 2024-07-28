import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
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
import { Gesture, GestureConfig, GestureController, GestureDetail, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  public languages = [];
  public selectedLanguage = 'en';
  public logoName = 'logo-esim.png';
  public selectedPackage: Package;
  public selectedUsage: UsageInfo;
  public $activePackages: Observable<Package[]>;
  public $subscriber: BehaviorSubject<SubscriberInfo> = new BehaviorSubject<SubscriberInfo>(null);
  public $subscribers: Observable<SubscriberInfo[]>;
  public subscribers: SubscriberInfo[] = [];


  constructor(public translateService: TranslateService,
              private homePageService: HomeService,
              private loginService: LoginService,
              private $LocalStorageService: LocalStorageService,
              private gestureCtrl: GestureController,
              private toastController: ToastController,
              private el: ElementRef) {
  }

  //Доделать свайп
  initializeGesture() {
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

  onSwipeEnd(ev: GestureDetail) {
    const deltaX = ev.deltaX;
    if (deltaX > 0) {
      this.handleSwipeRight();
    } else {
      this.handleSwipeLeft();
    }
  }

  handleSwipeRight() {
    if (this.subscribers.length > 1) {
      const currentIndex = this.subscribers.findIndex(sub => sub.id === this.$subscriber.value.id);
      const newIndex = (currentIndex - 1 + this.subscribers.length) % this.subscribers.length;
      this.selectSubscriber(this.subscribers[newIndex]);
    }
  }

  handleSwipeLeft() {
    if (this.subscribers.length > 1) {
      const currentIndex = this.subscribers.findIndex(sub => sub.id === this.$subscriber.value.id);
      const newIndex = (currentIndex + 1) % this.subscribers.length;
      this.selectSubscriber(this.subscribers[newIndex]);
    }
  }


  ngOnInit(): void {
    this.languages = Object.entries(languages).map(
      ([key, displayValue]) => ({key, displayValue})
    );
    this.selectedLanguage = this.$LocalStorageService.retrieve('language') || 'en';
    this.logoName = this.$LocalStorageService.retrieve('logoName');
    this.handleLangChange({detail: {value: this.selectedLanguage}});
    this.initSubscriberUsage();
    this.initSubscribers();

    this.initializeGesture();
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
        this.subscribers = subscribers;
        const primarySubscriber = subscribers.find(s => s.isPrimary);
        const storedPrimarySubscriber = this.$LocalStorageService.retrieve('primarySubscriber');
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
    localStorage.removeItem('token');
    this.loginService.logout();
  }

  public selectSubscriber(subscriber: any): void {
    this.$subscriber.next(subscriber);
  }

  public handleLangChange(event: any): void {
    this.$LocalStorageService.store('language', event.detail.value);
    this.selectedLanguage = languages[event.detail.value];
    this.translateService.use(event.detail.value);
  }

  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(
        this.translateService.instant('common.copied', { property: 'ICCID' })
      );
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
