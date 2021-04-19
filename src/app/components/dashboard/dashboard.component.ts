import { Component, OnInit } from '@angular/core';
import { ResLogins } from 'src/app/service-interface/interface-login';
import { ReqRefreshToken } from 'src/app/service-interface/token';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginTokenService } from 'src/app/services/service-login-token.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';


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

  DataToken: ResLogins;
  // tslint:disable-next-line:max-line-length
  constructor(private serciceToken: ServiceLoginTokenService, private callApi: ApiserviceService, private serviceLogin: ServiceLoginService) {
    this.DataToken = this.serciceToken.getToken();
  }


  ngOnInit(): void {
    // setInterval(this.resetToken, 10000);
    setInterval(() => {
      this.resetToken();
      }, 1800000);
  }

  resetToken() {
    console.log(`aaaaaaaaaaaaaaaaaaaaaa ${this.DataToken.refreshToken}`);
    const body: ReqRefreshToken = {
      token: this.DataToken.refreshToken
    };
    console.log('1');
    this.callApi.refreshToken(body).subscribe(
      (res) => {
        console.log('2');
        this.DataToken.accessToken = res.accessToken;
        console.log('this token ------------------------>', this.DataToken.accessToken);
      },
      (err) => {
        console.log('3');
        console.log('เข้า ree นะ', err);
      }
    );
  }

}