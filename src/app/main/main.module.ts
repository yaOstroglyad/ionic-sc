import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [MainComponent],
	imports: [
		CommonModule,
		RouterLink,
		IonicModule,
		RouterLinkActive,
		TranslateModule
	],
  providers: []
})
export class MainModule { }
