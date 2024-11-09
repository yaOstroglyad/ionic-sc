import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginKeyboardHandlerDirective } from './utils/login-keyboard-handler.directive';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		LoginPageRoutingModule,
		ReactiveFormsModule,
		PageWrapperModule,
		TranslateModule,
		LoginKeyboardHandlerDirective
	],
  declarations: [LoginPage]
})
export class LoginPageModule {}
