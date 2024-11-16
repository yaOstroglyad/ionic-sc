import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [EmptyStateComponent],
	imports: [
		CommonModule,
		TranslateModule,
		RouterLink
	],
  exports: [EmptyStateComponent]
})
export class EmptyStateModule { }
