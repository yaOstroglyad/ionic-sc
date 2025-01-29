import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SubscriberDataService } from './subscriber-data.service';
import { SubscriberInfo } from '../model/subscriberInfo';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private destroy$ = new Subject<void>();

  public subscriberSubject = new BehaviorSubject<SubscriberInfo | null>(null);
  public subscriber$: Observable<SubscriberInfo | null> = this.subscriberSubject.asObservable();
  public subscribers: SubscriberInfo[];

  constructor(private subscriberDataService: SubscriberDataService) {}

  loadSubscribers(): void {
    this.subscriberDataService.getSubscribers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((subscribers: SubscriberInfo[]) => {
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

  destroySubscriberData() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriberSubject.next(null);
    this.subscribers = [];
  }
}
