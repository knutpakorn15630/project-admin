import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResShowUser } from '../service-interface/interface-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

apiUrl = environment.httpApi;

  constructor(private thhpCli: HttpClient) { }

  // public showUser(): Observable<ResShowUser> {
  //   return this.httpClient.get<ResShowUser>(`${this.apiUrl}/api/user/get`);
  // }

}
