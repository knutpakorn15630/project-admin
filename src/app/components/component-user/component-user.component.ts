import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResLogins } from 'src/app/service-interface/interface-login';
import { ReqCreateUser, ReqUpdateUser, ResShowUser } from 'src/app/service-interface/interface-user';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ServiceLoginTokenService } from 'src/app/services/service-login-token.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-user',
  templateUrl: './component-user.component.html',
  styleUrls: ['./component-user.component.scss'],
  providers: [NgbPaginationConfig, NgbModal]
})
export class ComponentUserComponent implements OnInit {

  page = 4;

  DataUser: ResShowUser;

  ngMember = {
    name: '',
    lastName: '',
    user: '',
    pass: '',
  };

  ngUpdate = {
    token: '',
    id: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    passwordNew: '',
  };

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });


  DataToken: ResLogins;

  constructor(
    config: NgbPaginationConfig,
    config2: NgbModalConfig,
    private callApi: ApiserviceService,
    private serciceToken: ServiceLoginTokenService

  ) {
    config.size = 'sm';
    config.boundaryLinks = true;
    config2.backdrop = 'static';
    config2.keyboard = false;
    this.DataToken = this.serciceToken.getToken();
  }

  ngOnInit(): void {
    this.loadDataUser();
  }

  loadDataUser() {
    this.callApi.showUser().subscribe(
      (res) => {
        this.DataUser = res;
      }
    );
  }

  createUer() {
    const body: ReqCreateUser = {
      firstName: this.ngMember.name,
      lastName: this.ngMember.lastName,
      userName: this.ngMember.user,
      password: this.ngMember.pass
    };
    if (!this.ngMember.name || !this.ngMember.lastName || !this.ngMember.pass || !this.ngMember.user) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    } else {
      this.callApi.createUser(body).subscribe(
        (res) => {
          this.Toast.fire({
            icon: 'success',
            title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
          });
          this.loadDataUser();
          this.hideModal();
        }
      );
    }
  }


  UpdateData(id: number) {
    const Result = this.DataUser.data.find((x) => x.id === id);
    if (!Result) {
      return;
    }
    this.ngUpdate = {
      token: this.DataToken.accessToken,
      id: Result.id.toString(),
      password: Result.password,
      firstName: Result.firstName,
      lastName: Result.lastName,
      userName: Result.userName,
      passwordNew: this.ngUpdate.passwordNew,
    };
    $('#Update').modal('show');
  }

  updateUser() {
    const body: ReqUpdateUser = {
      token: this.DataToken.accessToken,
      id: Number(this.ngUpdate.id),
      password: this.ngUpdate.password,
      firstName: this.ngUpdate.firstName,
      lastName: this.ngUpdate.lastName,
      userName: this.ngUpdate.userName,
      passwordNew: this.ngUpdate.passwordNew
    };

    if (!this.ngUpdate.firstName || !this.ngUpdate.lastName || !this.ngUpdate.passwordNew) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    if (this.ngUpdate.password !== this.ngUpdate.passwordNew) {
      Swal.fire({
        icon: 'warning',
        title: 'รหัสผ่านไม่ถูกต้อง !',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    this.callApi.updateUser(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        console.log('this is dada ', res);
        this.loadDataUser();
        this.hideModal2();
      }
    );
  }

  deleteUser(id: number) {
    this.callApi.deleteUser(id).subscribe(
      (res) => {
      },
      (err) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลบสำเร็จเรียบร้อยแล้ว'
        });
        this.loadDataUser();
        console.log(err);
      }
    );
  }

  EmptyData() {
    this.ngMember = {
      name: '',
      lastName: '',
      user: '',
      pass: '',
    };
  }

  DataNull(){
    this.ngUpdate = {
      token: '',
      id: '',
      password: '',
      firstName: '',
      lastName: '',
      userName: '',
      passwordNew: '',
    };
  }


  hideModal() {
    $('#content').modal('hide');
    this.EmptyData();
  }

  hideModal2() {
    $('#Update').modal('hide');
    this.DataNull();
  }

  openLg() {
    $('#content').modal('show');
  }



}
