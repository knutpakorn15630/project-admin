import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReqCreateUser, ResShowUser } from 'src/app/service-interface/interface-user';
import { ApiserviceService } from 'src/app/services/apiservice.service';

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


  constructor(
    config: NgbPaginationConfig,
    config2: NgbModalConfig,
    private callApi: ApiserviceService,

  ) {
    config.size = 'sm';
    config.boundaryLinks = true;
    config2.backdrop = 'static';
    config2.keyboard = false;
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


  hideModal() {
    $('#content').modal('hide');
    this.EmptyData();
  }

  openLg() {
    $('#content').modal('show');
  }

}
