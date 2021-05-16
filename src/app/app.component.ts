import { Component, OnDestroy, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { Subscription } from 'rxjs';
import { ReqRefreshToken, ResDataLogin } from './service-interface/token';
import { ApiserviceService } from './services/apiservice.service';
import { ServiceLoginService } from './services/service-login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  dataTest: ResDataLogin;
  title = 'project-admin';
  tokenLogin: Subscription;
  tokenLogout: Subscription;
  intervalTime: any;

  constructor(private broadcaster: NgBroadcasterService, private serviceLogin: ServiceLoginService, private callApi: ApiserviceService) {
    // this.DataTokenLogin = this.serviceLogin.Token();
  }

  ngOnInit(): void {
    this.tokenLogin = this.broadcaster.listen('token-login').subscribe((res) => {
      console.log('token-login เข้า refresh');
      this.intervalRefaceTokenStart();
      // this.resetToken();
    });

    this.tokenLogout = this.broadcaster.listen('token-logout').subscribe((res) => {
      console.log('token-logout', res);
      this.intervalRefaceTokenClear();
    });
  }

  ngOnDestroy() {
    this.tokenLogin.unsubscribe();
    this.tokenLogout.unsubscribe();
  }

  intervalRefaceTokenStart() {
    if (this.intervalTime) {
      return;
    }
    this.intervalTime = setInterval(() => {
      const loginData = this.serviceLogin.getLogin();
      if (!loginData) {
        this.intervalRefaceTokenClear();
      }
      const jwt: any = jwt_decode(JSON.stringify(loginData));

      const now = moment();
      const then = moment.unix(jwt.exp).subtract(5, 'minute'); // time - 5m
      this.resetToken(loginData.refreshToken);
    }, 1680000);
  }

  intervalRefaceTokenClear() {
    if (this.intervalTime != null) {
      this.intervalTime = null;
      clearInterval(this.intervalTime);
    }
  }

  resetToken(Token: string) {
    const loginData = Token;
    const body: ReqRefreshToken = {
      refreshToken: loginData,
    };
    this.callApi.refreshToken(body).subscribe(
      (res) => {
        this.serviceLogin.accessToken(res.accessToken);
        console.log(`this refresh token ${this.serviceLogin.getLogin().accessToken}`);
      },
      (err) => {
        this.intervalRefaceTokenClear();
      },
    );
  }
}
