import { NgBroadcasterService } from 'ngx-broadcaster';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResLogin2 } from 'src/app/service-interface/interface-login';
import { ResKeyToken } from 'src/app/service-interface/token';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import { ReqLogoutUser } from 'src/app/service-interface/interface-user';

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
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private callApi: ApiserviceService,
    private serviceLogin: ServiceLoginService,
    public router: Router,
    private broadcaster: NgBroadcasterService,
  ) { }

  ngOnInit(): void {
    this.broadcaster.emitEvent('token-login', '');
  }

  logout() {
    const body: ReqLogoutUser = {
      refreshToken: this.serviceLogin.Token().refreshToken
    };
    console.log(`this is refreshtoken ${body.refreshToken}`);
    this.callApi.logoutUser(body).subscribe(
      (res) => {

      },
      (err) => {
        this.router.navigateByUrl('login');
        this.serviceLogin.clearLogin();
      }
    );

  }

}
