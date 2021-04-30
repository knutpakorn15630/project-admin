import { Injectable } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ResLogins } from '../service-interface/interface-login';
import { ResTokenService } from '../service-interface/token';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  DataToken: ResTokenService = null;



  constructor(private broadcaster: NgBroadcasterService) { }

  getLogin() {
    const loginSuccess = localStorage.getItem('login');
    return loginSuccess;
  }

  setLogin(Token: ResDataLogin) {
    const isLogin2: ResDataLogin = Token;
    this.broadcaster.emitEvent('token-login', Token);
    localStorage.setItem('login', JSON.stringify(isLogin2));
  }

  clearLogin() {
    // localStorage.clear();
    localStorage.removeItem('login');
  }

  Token() {
    if (this.getLogin()) {
      this.DataToken = JSON.parse(this.getLogin());
      return this.DataToken;
    }
  }

}

export interface ResDataLogin {
  accessToken: string;
  refreshToken: string;
}


