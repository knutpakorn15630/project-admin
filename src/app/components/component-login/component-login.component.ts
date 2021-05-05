import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgBroadcasterService } from 'ngx-broadcaster';
import {
  ReqLogins,
  ResLogins,
} from 'src/app/service-interface/interface-login';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import Swal from 'sweetalert2';

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
    private broadcaster: NgBroadcasterService
  ) {}

  ngOnInit(): void {
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
    this.broadcaster.listen('test-token').subscribe((res) => {
      this.testlogout = res.message;
      console.log(`this test login component ${this.testlogout}`);
    });
  }

  Logined() {
    const body: ReqLogins = {
      userName: this.LoginCreate.UserName,
      password: this.LoginCreate.password,
    };
    this.callApi.getLogin(body).subscribe(
      (res) => {
        this.DataLogin = res;
        setTimeout(() => {
          this.serviceLogin.setLogin(res);
          this.broadcaster.emitEvent('test-token', res);
        }, 500);
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
      }
    );
  }
}
