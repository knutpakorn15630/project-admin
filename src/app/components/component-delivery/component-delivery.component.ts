import { Component, OnInit } from '@angular/core';
import { ReqCreateDelivery, ReqDelivery, ResCreateDelivery, ResDataDelivery } from 'src/app/service-interface/interface-delivery';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-delivery',
  templateUrl: './component-delivery.component.html',
  styleUrls: ['./component-delivery.component.scss']
})
export class ComponentDeliveryComponent implements OnInit {

  DataDelivery: ResDataDelivery = null;

  Delivery: ResCreateDelivery = null;

  ngDelivery = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    tel: ''
  };

  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100
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


  constructor(private callApi: ApiserviceService) { }

  ngOnInit(): void {
    this.loadDelivery();
  }

  createDeliver() {
    const body: ReqCreateDelivery = {
      firstName: this.ngDelivery.firstName,
      lastName: this.ngDelivery.lastName,
      userName: this.ngDelivery.userName,
      password: this.ngDelivery.password,
      tel: this.ngDelivery.tel
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngDelivery.firstName || !this.ngDelivery.lastName || !this.ngDelivery.userName || !this.ngDelivery.password || !this.ngDelivery.tel) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    this.callApi.CreateDelivery(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.Delivery = res;
        this.loadDelivery();
        this.hideModal();
      }
    );
  }


  deleteUser(id: number) {
    this.callApi.deleteDelivery(id).subscribe(
      (res) => {

      },
      (err) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลบสำเร็จเรียบร้อยแล้ว'
        });
        this.loadDelivery();
        console.log(err);
      }
    );
  }

  loadDelivery() {
    const body: ReqDelivery = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showDataDelivery(body).subscribe(
      (res) => {
        this.DataDelivery = res;
        this.setPageTotal(this.DataDelivery.totalPages);
      }
    );
  }

  setPageTotal(totalArg: number) {
    this.ngPang.total = totalArg * 10;
  }

  pageTest() {
    setTimeout(() => {
      const ngPage: SwitchPage = {
        page: this.ngPang.Pang
      };
      console.log('==========================', ngPage);
      this.loadDelivery();
    }, 5);
  }

  EmptyData() {
    this.ngDelivery = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      tel: ''
    };
  }

  openLg() {
    $('#contentDelivery').modal('show');
  }


  hideModal() {
    $('#contentDelivery').modal('hide');
    this.EmptyData();
  }

}

interface SwitchPage {
  page: number;
}
