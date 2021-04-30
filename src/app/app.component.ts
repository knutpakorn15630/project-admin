import { Component, OnInit } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ResLogins } from './service-interface/interface-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  BroadCasToken: BroadcasterToken = null;


  constructor(private broadcaster: NgBroadcasterService) {}

  title = 'project-admin';

  getToken(){
    this.broadcaster.listen('token-login').subscribe( (res: ResLogins) => {
      this.BroadCasToken = res;
    });
  }
}
export interface BroadcasterToken {
  accessToken: string;
  refreshToken: string;
}
