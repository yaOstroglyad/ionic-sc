import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordModule {}
