import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';

export enum ForgotPasswordPageStates {
  defaultPageState = 'defaultPageState',
  applyCode = 'applyCode'
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  @ViewChild('defaultPageState', {static: true}) defaultPageState: TemplateRef<any>;
  @ViewChild('confirmAndUpdateState', {static: true}) confirmAndUpdateState: TemplateRef<any>;

  accountId: string;
  newPassword: FormControl = new FormControl(null);
  applyCode: FormControl = new FormControl(null);

  forgotPasswordPageState: TemplateRef<any>;

  constructor(private fpService: ForgotPasswordService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setDefaultState();

    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
  }

  setDefaultState(): void {
    this.newPassword.setValue(null);
    this.applyCode.setValue(null);
    this.forgotPasswordPageState = this.updatePageViewState(ForgotPasswordPageStates.defaultPageState);
  }

  validateUser(): void {
    // this.fpService.validateUser().subscribe(() => {
    //   this.forgotPasswordPageState = this.updatePageViewState(ForgotPasswordPageStates.applyCode);
    // });
    this.forgotPasswordPageState = this.updatePageViewState(ForgotPasswordPageStates.applyCode);
  }

  updatePassword(): void {
    // this.fpService.validateCodeAndUpdatePassword(this.newPassword.value, this.accountId).subscribe(() => {
    //   this.backToLoginPage();
    // })
    this.backToLoginPage();
  }

  backToLoginPage(): void {
    this.setDefaultState();
    this.router.navigate(['/login']);
  }

  backToForgotPasswordPage(): void {
    this.setDefaultState();
  }

  updatePageViewState(state): TemplateRef<any> {
    const states = {
      [ForgotPasswordPageStates.defaultPageState]: this.defaultPageState,
      [ForgotPasswordPageStates.applyCode]: this.confirmAndUpdateState
    }

    return states[state];
  }

}
