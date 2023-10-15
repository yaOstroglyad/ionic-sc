import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [EmptyStateComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [EmptyStateComponent]
})
export class EmptyStateModule { }
