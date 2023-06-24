import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent]
})
export class PageWrapperModule {}
