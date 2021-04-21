import { Injectable } from '@angular/core';
import { ResTokenService } from '../service-interface/token';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  DataToken: ResTokenService = null;


  constructor() { }

  getLogin() {
    const loginSuccess = localStorage.getItem('login');
    return loginSuccess;
  }

  setLogin(Token: ResDataLogin) {
    const isLogin2: ResDataLogin = Token;
    localStorage.setItem('login', JSON.stringify(isLogin2));
  }

  clearLogin() {
    localStorage.clear();
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
