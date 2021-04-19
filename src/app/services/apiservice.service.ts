import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReqLogins, ResLogins } from '../service-interface/interface-login';
import { ReqReport, ResReport } from '../service-interface/interface-report';
import { ReqCreateUser, ResCreateUser, ResShowUser } from '../service-interface/interface-user';
import { ReqRefreshToken, ResRefreshToken } from '../service-interface/token';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl = environment.httpApi;

  constructor(private httpApiClient: HttpClient) { }

  public showUser(): Observable<ResShowUser> {
    return this.httpApiClient.get<ResShowUser>(`${this.apiUrl}/api/user/get`);
  }

  public createUser(body: ReqCreateUser): Observable<ResCreateUser> {
    return this.httpApiClient.post<ResCreateUser>(`${this.apiUrl}/api/user/create`, body);
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpApiClient.delete<any>(`${this.apiUrl}/api/user/delete/${id}`);
  }

  public showReport(body: ReqReport): Observable<ResReport> {
    return this.httpApiClient.post<ResReport>(`${this.apiUrl}/api/report/gets`, body);
  }

  public getLogin(body: ReqLogins): Observable<ResLogins> {
    return this.httpApiClient.post<ResLogins>(`${this.apiUrl}/api/user/login`, body);
  }

  public refreshToken(body: ReqRefreshToken): Observable<ResRefreshToken> {
    return this.httpApiClient.post<ResRefreshToken>(`${this.apiUrl}/api/user/token`, body);
  }

  // public showUser(): Observable<ResShowUser> {
  //   return this.httpCliet.get(`${this.apiUrl}/api/user/get`);
  // }

}
