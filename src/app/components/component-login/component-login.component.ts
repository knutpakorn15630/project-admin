import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ReqLogins, ResLogins } from 'src/app/service-interface/interface-login';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.scss']
})
export class ComponentLoginComponent implements OnInit {

  DataLogin: ResLogins = null;

  input = {
    input1: {
      isFocus: false,
      text: '',
    },
    input2: {
      isFocus: false,
      text: '',
    },
  };

  LoginCreate = {
    UserName: '',
    password: '',
  };

  // tslint:disable-next-line:max-line-length
  constructor(private callApi: ApiserviceService, private router: Router, private serviceLogin: ServiceLoginService, private broadcaster: NgBroadcasterService) { }

  ngOnInit(): void {
  }


  Logined() {
    const body: ReqLogins = {
      userName: this.LoginCreate.UserName,
      password: this.LoginCreate.password
    };
    this.callApi.getLogin(body).subscribe(
      (res) => {
        this.DataLogin = res;
        if (!res) {

        } else {
          setTimeout(() => {
            this.serviceLogin.setLogin(res);
          }, 200);
          this.router.navigateByUrl('/dashboard/user');
        }
      }
    );
  }

}
