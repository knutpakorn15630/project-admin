import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceLoginService } from './services/service-login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  DataTokenTest: string;

  constructor(public router: Router, private serviceLogin: ServiceLoginService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      await this.serviceLogin.delay(1000);
      this.DataTokenTest = this.serviceLogin.getLogin();
      if (this.DataTokenTest) {
        console.log('login success', this.DataTokenTest);
        return resolve(true);
      } else {
        console.log('login fail');
        console.log('88888888888888', this.DataTokenTest);
        this.router.navigateByUrl('login');
      }
    });
  }

}

export interface ResDataLogin2 {
  accessToken: string;
  refreshToken: string;
}
