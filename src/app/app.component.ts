import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ResLogin2, ResLogins } from './service-interface/interface-login';
import { ReqRefreshToken } from './service-interface/token';
import { ApiserviceService } from './services/apiservice.service';
import { ServiceLoginService } from './services/service-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Datatest: ResBroadCas;
  title = 'project-admin';
  TestInterval;
  constructor(private broadcaster: NgBroadcasterService, private serviceLogin: ServiceLoginService, private callApi: ApiserviceService) {
    // this.DataTokenLogin = this.serviceLogin.Token();
  }


  ngOnInit(): void {

    this.broadcaster.listen('test-token').subscribe(res => {
      this.Datatest = res;
      console.log(`this test login component ${this.Datatest.accessToken}`);
    });


  }

}

export interface ResBroadCas {
  accessToken: string;
  refreshToken: string;
}
