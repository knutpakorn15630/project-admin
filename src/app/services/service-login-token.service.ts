import { Injectable } from '@angular/core';
import { ResTokenService } from '../service-interface/token';
import { ServiceLoginService } from './service-login.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginTokenService {

  constructor(private serviceLogin: ServiceLoginService) { }

  // getToken() {
  //   if (this.serviceLogin.getLogin()) {
  //     const isToken: ResTokenService = JSON.parse(this.serviceLogin.getLogin());
  //     console.log('this. to ken service', isToken);
  //     return isToken;
  //   }
  // }

}
