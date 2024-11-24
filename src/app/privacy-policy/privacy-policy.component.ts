import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  imports: [
    IonicModule,
    TranslateModule,
    NgForOf
  ],
  standalone: true
})
export class PrivacyPolicyComponent {
  lastUpdated: string;

  constructor() {
    this.lastUpdated = 'November 23, 2024';
  }
}
