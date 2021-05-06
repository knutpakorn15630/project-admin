import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ReqLogins, ResLogins } from 'src/app/service-interface/interface-login';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.scss'],
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
  decoded;
  data = {
    message: 'Hello World',
  };
  testlogout: string;

  // tslint:disable-next-line:max-line-length
  constructor(
    private callApi: ApiserviceService,
    private router: Router,
    private serviceLogin: ServiceLoginService,
    private broadcaster: NgBroadcasterService,
    private globalService: GlobalService,
    private serviceLoginService: ServiceLoginService,
  ) { }

  ngOnInit(): void {

    this.serviceLoginService.clearLogin();
    this.broadcaster.emitEvent('token-logout', '');

    const inputs = document.querySelectorAll('.input');

    function addFocus() {
      const parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function removeFocus() {
      const parent = this.parentNode.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', addFocus);
      input.addEventListener('blur', removeFocus);
    });
  }

  login() {
    const body: ReqLogins = {
      userName: this.LoginCreate.UserName,
      password: this.LoginCreate.password,
    };
    this.callApi.getLogin(body).subscribe(
      async (res) => {
        this.DataLogin = res;
        this.serviceLogin.setLogin(res);
        await this.globalService.delay(500);
        this.broadcaster.emitEvent('token-login', res);
        console.log('login -> redirect');
        this.router.navigateByUrl('/dashboard/user');
      },
      (err) => {
        console.log(`login err ${err}`);
        Swal.fire({
          icon: 'warning',
          title: 'รหัสผ่านไม่ถูกต้อง',
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      },
    );
  }
}
