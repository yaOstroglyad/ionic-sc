import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    WidgetsComponent
  ],
	imports: [
		CommonModule,
		TranslateModule,
		IonicModule
	],
  exports: [
    WidgetsComponent
  ]
})
export class WidgetsModule { }
