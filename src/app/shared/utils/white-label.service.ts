import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserViewConfig } from '../model/userViewConfig';
import { JwtHelperService } from '../auth/jwt-helper.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { hexRgb } from './rgb-hex-convertor';

export const anexConfig: UserViewConfig = {
  primaryColor: '#0072ce',
  language: 'en',
  logoName: 'anex.png'
};

export const defaultConfig: UserViewConfig = {
  primaryColor: '#f9a743',
  language: 'en',
  logoName: '1esim-logo.png'
};

@Injectable({providedIn: 'root'})
export class WhiteLabelService {
  public $viewConfig: BehaviorSubject<UserViewConfig> = new BehaviorSubject<UserViewConfig>(defaultConfig);

  constructor(private jwtHelper: JwtHelperService,
              private $SessionStorageService: SessionStorageService,
              private $LocalStorageService: LocalStorageService) {}


  public initViewBasedOnCurrentUser(): void {
    let token = this.$LocalStorageService.retrieve('authenticationToken');
    if (!token) {
      token = this.$SessionStorageService.retrieve('authenticationToken');
    }

    this.updateViewConfig(token);
  }

  public updateViewConfig(token: any): void {
    if (this.jwtHelper.isToken(token)) {
      const jwtToken = this.jwtHelper.decodeToken(token);

      //Remove hardcode when white label BE will be done
      if (this.isAnexCustomer(jwtToken)) {
        this.$viewConfig.next(anexConfig);
      } else {
        this.$viewConfig.next({
          primaryColor: jwtToken?.primaryColor || defaultConfig.primaryColor,
          language: jwtToken?.language || defaultConfig.language,
          logoName: jwtToken?.logoName || defaultConfig.logoName
        });
      }
    }
  }

  public updateStoreDate(config: UserViewConfig): void {
    this.$LocalStorageService.store('primaryColor', config.primaryColor);
    this.$LocalStorageService.store('logoName', config.logoName);
  }

  public updateDocumentViewBasedConfig(config: UserViewConfig): void {
    const rgbConfig = hexRgb(config.primaryColor);
    document.documentElement.style.setProperty('--sc-color-primary', config.primaryColor);
    document.documentElement.style.setProperty('--sc-color-primary-rgb', `${rgbConfig.red}, ${rgbConfig.green}, ${rgbConfig.blue}`);
  }

  private isAnexCustomer(data: any): boolean {
    if (data && data.email) {
      const email: string = data.email;
      return email.endsWith('anextour.com');
    }
    return false;
  }

}
