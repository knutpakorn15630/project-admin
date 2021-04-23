import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReqCreateDelivery, ReqDelivery, ResCreateDelivery, ResDataDelivery } from '../service-interface/interface-delivery';
import { ReqLogins, ResLogins } from '../service-interface/interface-login';
import { ReqCreateReport, ReqReport, ResCreateReport, ResGetChauffeur, ResGetShop, ResReport } from '../service-interface/interface-report';
import { ReqCreateShop, ReqShowShop, ReqUpdateShop, ResDataChauffeur, ResDataCreateShop, ResShowShop, ResUpdateShop } from '../service-interface/interface-shop';
import { ReqCreateUser, ReqLogoutUser, ReqUpdateUser, ResCreateUser, ResShowUser } from '../service-interface/interface-user';
import { ReqRefreshToken, ResKeyToken, ResRefreshToken } from '../service-interface/token';
import { ServiceLoginTokenService } from './service-login-token.service';
import { ServiceLoginService } from './service-login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl = environment.httpApi;

  DataToken: ResLogins;

  // tslint:disable-next-line:max-line-length
  constructor(private httpApiClient: HttpClient, private serviceLogin: ServiceLoginService, private serciceToken: ServiceLoginTokenService) {
  }



  // User---------------------------------------------------------------------------------------------------------------

  public showUser(): Observable<ResShowUser> {
    return this.httpApiClient.get<ResShowUser>(`${this.apiUrl}/api/user/get`);
  }

  public createUser(body: ReqCreateUser): Observable<ResCreateUser> {
    return this.httpApiClient.post<ResCreateUser>(`${this.apiUrl}/api/user/create`, body);
  }

  public updateUser(body: ReqUpdateUser): Observable<any> {
    return this.httpApiClient.post<any>(`${this.apiUrl}/api/user/update`, body);
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpApiClient.delete<any>(`${this.apiUrl}/api/user/delete/${id}`);
  }

  // Report--------------------------------------------------------------------------------------------------------------

  public showReport(body: ReqReport): Observable<ResReport> {
    return this.httpApiClient.post<ResReport>(`${this.apiUrl}/api/report/gets`, body);
  }

  public createReport(body: ReqCreateReport): Observable<ResCreateReport> {
    return this.httpApiClient.post<ResCreateReport>(`${this.apiUrl}/api/report/createUser`, body);
  }

  public GetDataShop(): Observable<ResGetShop> {
    return this.httpApiClient.get<ResGetShop>(`${this.apiUrl}/api/report/getShop`);
  }

  public GetDataChauffeur(): Observable<ResGetChauffeur> {
    return this.httpApiClient.get<ResGetChauffeur>(`${this.apiUrl}/api/report/getChauffeur`);
  }

  public DeleteReport(id: number): Observable<any>{
    return this.httpApiClient.delete<any>(`${this.apiUrl}/api/report/delete/${id}`);
  }


  // Login/Token/Logout---------------------------------------------------------------------------------------------------

  public getLogin(body: ReqLogins): Observable<ResLogins> {
    return this.httpApiClient.post<ResLogins>(`${this.apiUrl}/api/user/login`, body);
  }

  public refreshToken(body: ReqRefreshToken): Observable<ResRefreshToken> {
    return this.httpApiClient.post<ResRefreshToken>(`${this.apiUrl}/api/user/token`, body);
  }

  public logoutUser(body: ReqLogoutUser): Observable<any> {
    return this.httpApiClient.post<any>(`${this.apiUrl}/api/user/logout`, body);
  }



  // Delivery------------------------------------------------------------------------------------------------------------

  public showDataDelivery(body: ReqDelivery): Observable<ResDataDelivery> {
    return this.httpApiClient.post<ResDataDelivery>(`${this.apiUrl}/api/chauffeur/gets`, body);
  }

  public CreateDelivery(body: ReqCreateDelivery): Observable<ResCreateDelivery> {
    return this.httpApiClient.post<ResCreateDelivery>(`${this.apiUrl}/api/chauffeur/createChauffeur`, body);
  }

  public deleteDelivery(id: number): Observable<any> {
    return this.httpApiClient.delete<any>(`${this.apiUrl}/api/chauffeur/delete/${id}`);
  }

  // Shop--------------------------------------------------------------------------------------------------------------------

  public showDataShop(body: ReqShowShop): Observable<ResShowShop> {
    return this.httpApiClient.post<ResShowShop>(`${this.apiUrl}/api/shop/gets`, body);
  }

  public CreateShop(body: ReqCreateShop): Observable<ResDataCreateShop> {
    return this.httpApiClient.post<ResDataCreateShop>(`${this.apiUrl}/api/shop/createShopUser`, body);
  }

  public GetChauffeur(): Observable<ResDataChauffeur>{
    return this.httpApiClient.get<ResDataChauffeur>(`${this.apiUrl}/api/shop/dataChauffeur`);
  }

  public UpdateShop(body: ReqUpdateShop): Observable<ResUpdateShop>{
    return this.httpApiClient.post<ResUpdateShop>(`${this.apiUrl}/api/shop/update`, body);
  }

  public DeleteShop(id: number): Observable<any>{
    return this.httpApiClient.delete<any>(`${this.apiUrl}/api/shop/delete/${id}`);
  }


}
