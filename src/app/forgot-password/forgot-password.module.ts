import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    PageWrapperModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordModule {}
