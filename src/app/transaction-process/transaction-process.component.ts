import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.component.html',
  styleUrls: ['./transaction-process.component.scss'],
})
export class TransactionProcessComponent  implements OnInit {
  status = 'loading';
  message = 'transaction-process.default';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.transactionResult === 'true') {
        this.status = 'success';
        this.message = 'transaction-process.success';
      } else {
        this.status = 'error';
        this.message = 'transaction-process.error';
      }
      this.redirectToHomePage();
    });
  }

 redirectToHomePage() {
   setTimeout(() => {
     this.router.navigate(['/home']);
   }, 3000);
 }

}
