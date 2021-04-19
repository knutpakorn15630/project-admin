import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

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

}

export interface ResDataLogin {
  accessToken: string;
  refreshToken: string;
}
