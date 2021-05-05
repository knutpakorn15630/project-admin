import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ResLogin2, ResLogins } from 'src/app/service-interface/interface-login';
import { ReqLogoutUser } from 'src/app/service-interface/interface-user';
import { ReqRefreshToken, ResKeyToken } from 'src/app/service-interface/token';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import jwt_decode from 'jwt-decode';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'สมาชิก', icon: '<i class="fas fa-user"></i>' },
  { path: '/report', title: 'รายงาน', icon: '<i class="fas fa-user"></i>' },
  { path: '/delivery', title: 'พนักงานส่ง', icon: '<i class="fas fa-user"></i>' },
  { path: '/shop', title: 'ร้านค้า', icon: '<i class="fas fa-user"></i>' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems: any[];

  DataTokenLogin: ResLogin2;

  DataTokenBearer: ResKeyToken = null;

  BroadCasToken: BroadcasterToken = null;

  decodedToken;

  login = {
    message: 'Login out',
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    private callApi: ApiserviceService,
    private serviceLogin: ServiceLoginService,
    public router: Router,
    private broadcaster: NgBroadcasterService) {

  }

  TestInterval;

  ngOnInit(): void {

    // setInterval(this.resetToken, 10000);
    // this.TestInterval = setInterval(() => {
    //   this.resetToken();
    // }, 50000);

    // this.broadcaster.listen('token-login').subscribe(res => {
    //   this.BroadCasToken = res;
    //   this.decodedToken = jwt_decode(this.BroadCasToken.accessToken);
    //   console.log('///////////////////', this.decodedToken.name);
    // });

    // this.broadcaster.listen('test-token').subscribe(res => {
    //   this.BroadCasToken = res;
    //   console.log(`บอดแคช  ${this.BroadCasToken.accessToken}`);
    // });
  }

  logout() {
    // this.DataTokenLogin = await this.serviceLogin.Token();
    this.DataTokenLogin = this.serviceLogin.Token();
    const body: ReqLogoutUser = {
      token: this.DataTokenLogin.accessToken
    };
    this.callApi.logoutUser(body).subscribe(
      (res) => {
      },
      (err) => {
        clearInterval(this.TestInterval);
        console.log('Clear', this.TestInterval);
        this.serviceLogin.clearLogin();
        // this.serviceLogin.clearDelete();
        console.log(`token ${this.serviceLogin.Token()}`);
        this.broadcaster.emitEvent('test-token', this.login);
        this.router.navigateByUrl('login');
      }
    );
  }

  resetToken() {
    this.DataTokenLogin = this.serviceLogin.Token();
    console.log(`aaaaaaaaaaaaaaaaaaaaaa ${this.DataTokenLogin.accessToken}`);
    const body: ReqRefreshToken = {
      token: this.DataTokenLogin.refreshToken
    };
    console.log('1');
    this.callApi.refreshToken(body).subscribe(
      (res) => {
        console.log('2');
        this.DataTokenLogin.accessToken = res.accessToken;
        this.broadcaster.emitEvent('token-login', res);
        console.log('this token ------------------------>', this.DataTokenLogin.accessToken);
      },
      (err) => {
        console.log('3');
        console.log('เข้า ree นะ', err);
      }
    );
  }

}

export interface BroadcasterToken {
  accessToken: string;
  refreshToken: string;
}
