import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  private get isAuthenticated(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticated;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticated;
  }
}
