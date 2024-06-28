import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/auth/auth.service';
import { hexRgb } from './shared/utils/rgb-hex-convertor';
import { UserViewConfig } from './shared/model/userViewConfig';
import { LocalStorageService } from 'ngx-webstorage';
import { languages } from './shared/consts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private $LocalStorageService: LocalStorageService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(languages[browserLang] ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.authService.initViewBasedOnCurrentUser();

    this.authService.$viewConfig
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((config: UserViewConfig) => {
        this.$LocalStorageService.store('primaryColor', config.primaryColor);
        this.$LocalStorageService.store('logoName', config.logoName);
        const rgbConfig = hexRgb(config.primaryColor);
        document.documentElement.style.setProperty('--sc-color-primary', config.primaryColor);
        document.documentElement.style.setProperty('--sc-color-primary-rgb', `${rgbConfig.red}, ${rgbConfig.green}, ${rgbConfig.blue}`);

        const storedLanguage = this.$LocalStorageService.retrieve('language');
        this.translate.use(storedLanguage ? storedLanguage : config.language);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

