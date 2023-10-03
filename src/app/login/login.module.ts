import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		LoginPageRoutingModule,
		ReactiveFormsModule,
		PageWrapperModule,
		TranslateModule
	],
  declarations: [LoginPage]
})
export class LoginPageModule {}
