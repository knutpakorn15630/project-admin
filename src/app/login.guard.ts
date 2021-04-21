import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResLogins } from './service-interface/interface-login';
import { ServiceLoginTokenService } from './services/service-login-token.service';
import { ServiceLoginService } from './services/service-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  DataTokenTest: string;

  constructor( private serciceToken: ServiceLoginTokenService,  public router: Router, private serviceLogin: ServiceLoginService ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      // const loginTest2 = this.LoginSer.setLogin(this.loginTest);
      if (this.serviceLogin.getLogin()) {
        console.log('login success', this.serviceLogin.getLogin());
        return resolve(true);
      } else {
        console.log('login fail');
        this.router.navigateByUrl('login');
      }
    });
  }

}

export interface ResDataLogin2 {
  accessToken: string;
  refreshToken: string;
}
