import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { SubscriberService } from '../shared/services/subscriber.service';
import { addIcons } from 'ionicons';
import { cart, bag, documentText, list, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private subscriberService: SubscriberService
  ) {
    addIcons({ cart, bag, documentText, list, logOut });
  }

  ngOnDestroy(): void {
    console.log('im in OnDestroy');
    }

  ngOnInit() {
    this.subscriberService.loadSubscribers();
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loginService.logout();
  }
}
