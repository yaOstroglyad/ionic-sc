import {Injectable} from '@angular/core';

import {KeycloakService} from 'keycloak-angular';

import {from, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  set account(account: any) {
    this._account = account;

    localStorage.setItem(this._accountStorageKey, JSON.stringify(account));
  }
  get account(): any {
    if (!this._account) {
      const accountStorageKey = localStorage.getItem(this._accountStorageKey);

      if (accountStorageKey && accountStorageKey !== 'undefined') {
        this._account = JSON.parse(accountStorageKey);
      }
    }

    return this._account;
  }

  private readonly _accountStorageKey = 'account';

  private _account: any;
  private token: string;
  private user: Partial<any>;

  constructor(
    private readonly keycloakService: KeycloakService
  ) {
    this.keycloakService.getToken().then(token => {
      this.token = token;
    });
  }

  fetchAccount(): Observable<any> {
    // return this.accountsService
    return of({accountName: 'test'})
        .pipe(
        map((account) => {
          if (account) {
            this.account = account;

            return this.account;
          }

          return null;
        }),
      );
  }

  getUser(): Observable<Partial<any>> {
    if (this.user) {
      return of(this.user);
    }

    // return this.currentUserQuery.fetch()
    return of({userName: 'test'})
      .pipe(
        tap(user => this.user = user),
      );
  }

  logout(): void {
    this.reset();
    this.keycloakService.logout('');
  }

  reset(): void {
    this.resetAccount();
  }

  resetAccount(): void {
    this._account = null;
    localStorage.removeItem(this._accountStorageKey);
  }

  userProfile(): Observable<any> {
    return from(this.keycloakService.loadUserProfile());
  }
}
