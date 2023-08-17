import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected readonly router: Router,
    protected readonly keycloakService: KeycloakService,
  ) {
    super(router, keycloakService);
  }

  isAccessAllowed(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.authenticated) {
        this.keycloakService
          .login()
          .catch(() => {
            resolve(false);
          });
      } else {
        resolve(true);
      }
    });
  }
}
