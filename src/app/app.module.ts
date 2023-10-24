import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CustomHttpInterceptor } from './shared/services/httpInspector.service';
import { TransactionProcessModule } from './transaction-process/transaction-process.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TransactionProcessModule,
    PageNotFoundModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
