import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResDataLogin } from '../service-interface/token';
import { ServiceLoginService } from './service-login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  DataTokenTest: ResDataLogin;

  constructor(public router: Router, private serviceLogin: ServiceLoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.DataTokenTest = this.serviceLogin.getLogin();
    if (this.DataTokenTest) {
      return true;
    } else {
      console.log('login fail');
      this.router.navigateByUrl('login');
    }
  }
}

export interface ResDataLogin2 {
  accessToken: string;
  refreshToken: string;
}
