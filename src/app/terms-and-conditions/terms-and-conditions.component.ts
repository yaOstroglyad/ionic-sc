import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  imports: [
    IonicModule,
    TranslateModule,
    NgForOf
  ],
  standalone: true
})
export class TermsAndConditionsComponent {
  lastUpdated: string;

  constructor() {
    this.lastUpdated = 'November 23, 2024'; // Дата обновления
  }
}
