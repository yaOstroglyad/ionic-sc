import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPagePage } from './registration-page.page';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    PageWrapperModule
  ],
  declarations: [RegistrationPagePage]
})
export class RegistrationPageModule {}
