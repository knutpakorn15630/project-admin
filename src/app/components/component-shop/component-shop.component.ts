import { Component, OnInit } from '@angular/core';
import { ReqCreateShop, ReqSearchShop, ReqShowShop, ReqUpdateShop, ResDataChauffeur, ResDataCreateShop, ResShowShop, ResStatus } from 'src/app/service-interface/interface-shop';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-shop',
  templateUrl: './component-shop.component.html',
  styleUrls: ['./component-shop.component.scss']
})
export class ComponentShopComponent implements OnInit {

  DataShop: ResShowShop = null;

  Data: ResDataCreateShop = null;

  GetChauffeur: ResDataChauffeur = null;
  GetTestStatus: ResStatus = null;

  isCheck = false;

  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100,
    search: ''
  };

  ngCreate = {
    name: '',
    day: '',
    la: '',
    long: '',
  };

  ngUpdate = {
    shopId: '',
    name: '',
    day_cycle: '',
    status: '',
    color: '',
    latitude: '',
    longitude: '',
    statusId: ''
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
    this.loadDataShop();
    this.GetStatus();
    // this.GetDataChauffeur();
  }

  GetDataChauffeur() {
    this.callApi.GetChauffeur().subscribe(
      (res) => {
        this.GetChauffeur = res;
      }
    );
  }


  GetStatus() {
    this.callApi.GetStatus().subscribe(
      (res) => {
        this.GetTestStatus = res;

      }
    );
  }

  openLg() {
    $('#Create').modal('show');
  }

  open() {
    $('#Update').modal('show');
  }

  hideModal() {
    $('#Create').modal('hide');
    this.clearForm();
    this.isCheck = false;
  }

  hideModal2() {
    $('#Update').modal('hide');
    this.clearForm();
  }

  pageTest() {
    setTimeout(() => {
      const ngPage: SwitchPage = {
        page: this.ngPang.Pang
      };
      console.log('==========================', ngPage);
      this.loadDataShop();
    }, 5);
  }

  setPageTotal(totalArg: number) {
    this.ngPang.total = totalArg * 10;
  }

  loadDataShop() {
    const body: ReqShowShop = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showDataShop(body).subscribe(
      (res) => {
        this.DataShop = res;
        console.log(`this is datashop ${this.DataShop.data}`);
        this.setPageTotal(this.DataShop.totalPages);
      }
    );
  }

  CreateDataShop() {
    // const GetIdChauffeur = this.GetChauffeur.data.find((x) => x.id + ' ' + x.firstName + ' ' + x.lastName === this.ngCreate.chauffeurId);
    const body: ReqCreateShop = {
      name: this.ngCreate.name,
      day_cycle: Number(this.ngCreate.day),
      latitude: Number(this.ngCreate.la),
      longitude: Number(this.ngCreate.long),
    };
    if (!this.ngCreate.name || !this.ngCreate.day || !this.ngCreate.la || !this.ngCreate.long) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1000
      });
      this.isCheck = true;
      return;
    } else {
      this.callApi.CreateShop(body).subscribe(
        (res) => {
          this.Toast.fire({
            icon: 'success',
            title: 'เพิ่มข้อมูลสำเร็จ'
          });
          this.isCheck = false;
          this.Data = res;
          this.loadDataShop();
          this.clearForm();
          this.hideModal();
        }
      );
    }
  }

  ShowUpdateShop(id: number) {
    const DateShowShop = this.DataShop.data.find((a) => a.id === id);
    if (!DateShowShop) {
      return;
    }
    this.ngUpdate = {
      shopId: DateShowShop.id.toString(),
      name: DateShowShop.name,
      day_cycle: DateShowShop.day_cycle.toString(),
      status: DateShowShop.status,
      color: DateShowShop.color,
      latitude: DateShowShop.latitude.toString(),
      longitude: DateShowShop.longitude.toString(),
      statusId: DateShowShop.statusId
    };
    $('#Update').modal('show');
  }

  updateShop() {
    const body: ReqUpdateShop = {
      shopId: Number(this.ngUpdate.shopId),
      name: this.ngUpdate.name,
      day_cycle: Number(this.ngUpdate.day_cycle),
      status: this.ngUpdate.status,
      color: this.ngUpdate.color,
      latitude: Number(this.ngUpdate.latitude),
      longitude: Number(this.ngUpdate.longitude),
      statusId: Number(this.ngUpdate.statusId)
    };
    this.callApi.UpdateShop(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.loadDataShop();
        this.hideModal2();
      }
    );
  }

  deleteDateShop(id: number) {
    this.callApi.DeleteShop(id).subscribe(
      (res) => {
      },
      (err) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลบสำเร็จเรียบร้อยแล้ว'
        });
        this.loadDataShop();
        console.log(err);
      }
    );
  }

  searchShop() {
    const body: ReqSearchShop = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang,
      name: this.ngPang.search
    };

    this.callApi.searchShop(body).subscribe(
      (res) => {
        this.DataShop = res;
        this.setPageTotal(this.DataShop.totalPages);
      }
    );
  }

  clearForm() {
    this.ngCreate = {
      name: '',
      day: '',
      la: '',
      long: '',
    };
  }

}
interface SwitchPage {
  page: number;
}

