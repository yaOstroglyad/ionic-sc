import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-purchase-result-page',
  templateUrl: './purchase-result-page.component.html',
  styleUrls: ['./purchase-result-page.component.scss'],
  imports: [
    IonicModule,
    TranslateModule,
    PageWrapperModule,
    NgIf
  ],
  standalone: true
})
export class PurchaseResultPageComponent  implements OnInit {
  transactionStatus: 'success' | 'error';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.transactionStatus = params['status'] === 'success' ? 'success' : 'error';
      setTimeout(() => {
        this.backToHomePage();
      }, 2000)
    });
  }

  backToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
