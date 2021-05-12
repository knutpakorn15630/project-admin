import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { ReqCreateDelivery, ReqDelivery, ReqUpdate, ResCreateDelivery, ResDataDelivery } from 'src/app/service-interface/interface-delivery';
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

  CheckRed = true;
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

  ngUpdate = {
    id: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    tel: '',
  };

  isCheck = false;

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
        timer: 1500
      });
      this.isCheck = true;
      return;
    }
    this.callApi.CreateDelivery(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.isCheck = false;
        this.Delivery = res;
        this.loadDelivery();
        this.hideModal();
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Username นี้ถูกใช้งานไปแล้ว กรุณณาตั้ง username!',
          showConfirmButton: false,
          timer: 2000
        });
        console.log(err);
      }
    );
  }

  ShowUpdateShop(id: number) {
    const DateShowDelivery = this.DataDelivery.data.find((a) => a.id === id);
    if (!DateShowDelivery) {
      return;
    }
    this.ngUpdate = {
      id: DateShowDelivery.id.toString(),
      password: DateShowDelivery.password,
      firstName: DateShowDelivery.firstName,
      lastName: DateShowDelivery.lastName,
      userName: DateShowDelivery.userName,
      tel: DateShowDelivery.tel
    };
    $('#UpdateDeliVery').modal('show');
  }

  updateShop() {
    const body: ReqUpdate = {
      id: this.ngUpdate.id,
      password: this.ngUpdate.password,
      firstName: this.ngUpdate.firstName,
      lastName: this.ngUpdate.lastName,
      userName: this.ngUpdate.userName,
      tel: this.ngUpdate.tel
    };
    this.callApi.UpdateDelivery(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.loadDelivery();
        this.hideModalUpdate();
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
    this.isCheck = false;
  }

  hideModalUpdate() {
    $('#UpdateDeliVery').modal('hide');
  }

}

interface SwitchPage {
  page: number;
}
