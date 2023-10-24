import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class PageNotFoundModule { }
