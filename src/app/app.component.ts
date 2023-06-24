import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/auth/auth.service';
import { hexRgb } from './shared/utils/rgb-hex-convertor';
import { UserViewConfig } from './shared/model/userViewConfig';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService,
              private authService: AuthService,
              private $LocalStorageService: LocalStorageService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    /** initiate view based on user config **/
    this.authService.initViewBasedOnCurrentUser().subscribe((config: UserViewConfig) => {
      this.$LocalStorageService.store('primaryColor', config.primaryColor);
      const rgbConfig = hexRgb(config.primaryColor);
      document.documentElement.style.setProperty('--sc-color-primary', config.primaryColor);
      document.documentElement.style.setProperty('--sc-color-primary-rgb', `${rgbConfig.red}, ${rgbConfig.green}, ${rgbConfig.blue}`);

      this.translate.setDefaultLang(config.language);
    });
  }
}
