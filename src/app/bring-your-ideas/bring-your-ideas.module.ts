import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BringYourIdeasComponent } from './bring-your-ideas.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BringYourIdeasComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    BringYourIdeasComponent
  ]
})
export class BringYourIdeasModule { }
