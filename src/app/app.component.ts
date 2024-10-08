import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserViewConfig } from './shared/model/userViewConfig';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { languages } from './shared/consts';
import { Subject, takeUntil } from 'rxjs';
import { WhiteLabelService } from './shared/utils/white-label.service';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    public translate: TranslateService,
    private whiteLabelService: WhiteLabelService,
    private $localStorage: LocalStorageService,
    private authService: AuthService,
    private $sessionStorage: SessionStorageService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(languages[browserLang] ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.initializeApp();
    this.whiteLabelService.initViewBasedOnCurrentUser();

    this.whiteLabelService.$viewConfig
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((config: UserViewConfig) => {
        this.whiteLabelService.updateStoreDate(config);
        this.whiteLabelService.updateDocumentViewBasedConfig(config);

        const storedLanguage = this.$localStorage.retrieve('language');
        this.translate.use(storedLanguage ? storedLanguage : config.language);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeApp(): void {
    const loginResponse = this.$sessionStorage.retrieve('loginResponse') || this.$localStorage.retrieve('loginResponse');
    if (loginResponse) {
      this.authService.scheduleTokenRefresh(loginResponse);
    }
  }
}

