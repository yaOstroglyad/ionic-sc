import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CustomHttpInterceptor } from './shared/services/httpInspector.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { take } from 'rxjs';
import { AuthGuard } from './shared/guards';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function keycloakInitializerFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init({
    config: 'assets/keycloak-config/keycloak.json',
    enableBearerInterceptor: true,
    initOptions: {checkLoginIframe: false},
  });
}

export function titleInitializerFactory(title: Title, translate: TranslateService) {
  return () => translate
    .get('eSim-Self-Care_')
    .pipe(take(1))
    .subscribe((res: string) => {
      title.setTitle(res);
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
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
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: titleInitializerFactory,
      multi: true,
      deps: [Title, TranslateService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInitializerFactory,
      multi: true,
      deps: [KeycloakService, Title],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
