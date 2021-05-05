import { Injectable } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ResLogins } from '../service-interface/interface-login';
import { ResDataLogin, ResTokenService } from '../service-interface/token';

@Injectable({
  providedIn: 'root',
})
export class ServiceLoginService {
  DataToken: ResTokenService = null;

  constructor(private broadcaster: NgBroadcasterService) {}

  getLogin(): ResDataLogin {
    const loginSuccess = localStorage.getItem('login');
    if (!loginSuccess) {
      return null;
    }
    const json = JSON.parse(loginSuccess);
    return json;
  }

  setLogin(Token: ResDataLogin) {
    const isLogin2: ResDataLogin = Token;
    localStorage.setItem('login', JSON.stringify(isLogin2));
  }

  clearLogin() {
    this.clearDelete();
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  Token() {
    return this.getLogin();
  }

  accessToken(accessToken: string) {
    const data = this.getLogin();
    data.accessToken = accessToken;
    this.setLogin(data);
  }

  clearDelete() {
    this.DataToken = null;
    localStorage.clear();
  }
}
