import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriberDataService } from './subscriber-data.service';
import { SubscriberInfo } from '../model/subscriberInfo';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private subscriberSubject = new BehaviorSubject<SubscriberInfo | null>(null);
  public subscriber$: Observable<SubscriberInfo | null> = this.subscriberSubject.asObservable();
  public subscribers: SubscriberInfo[];

  constructor(private subscriberDataService: SubscriberDataService) {}

  loadSubscribers(): void {
    this.subscriberDataService.getSubscribers().subscribe((subscribers: SubscriberInfo[]) => {
      this.subscribers = subscribers;
      const primarySubscriber = subscribers.find(sub => sub.isPrimary);
      if (primarySubscriber) {
        this.subscriberSubject.next(primarySubscriber);
      } else {
        console.warn('No primary subscriber found');
      }
    });
  }

  getSubscriberUsage(id: string) {
    return this.subscriberDataService.getSubscriberUsage(id);
  }

  setCurrentSubscriber(subscriber: SubscriberInfo): void {
    this.subscriberSubject.next(subscriber);
  }

  get currentSubscriber(): SubscriberInfo | null {
    return this.subscriberSubject.value;
  }
}
