import { Component, OnInit } from '@angular/core';
import { ReqCreateShop, ReqShowShop, ReqUpdateShop, ResDataChauffeur, ResDataCreateShop, ResShowShop } from 'src/app/service-interface/interface-shop';
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

  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100
  };

  ngCreate = {
    name: '',
    status: '',
    la: '',
    long: '',
    chauffeurId: '',
    id: ''
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
    this.GetDataChauffeur();
  }

  GetDataChauffeur() {
    this.callApi.GetChauffeur().subscribe(
      (res) => {
        this.GetChauffeur = res;
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
        this.setPageTotal(this.DataShop.totalPages);
      }
    );
  }

  CreateDataShop() {
    const GetIdChauffeur = this.GetChauffeur.data.find((x) => x.id + ' ' + x.firstName + ' ' + x.lastName === this.ngCreate.chauffeurId);
    const body: ReqCreateShop = {
      name: this.ngCreate.name,
      status: this.ngCreate.status,
      la: this.ngCreate.la,
      long: this.ngCreate.long,
      chauffeurId: GetIdChauffeur.id
    };

    this.callApi.CreateShop(body).subscribe(
      (res) => {
        this.Data = res;
        console.log(`this. Data ${this.Data.chauffeurId}`);
        this.loadDataShop();
        this.clearForm();
        this.hideModal();
      }
    );
  }

  ShowUpdateShop(id: number) {
    const DateShowShop = this.DataShop.data.find((a) => a.id === id);
    if (!DateShowShop) {
      return;
    }
    this.ngCreate = {
      name: DateShowShop.name,
      status: DateShowShop.status,
      la: DateShowShop.latitude,
      long: DateShowShop.longitude,
      chauffeurId: DateShowShop.chauffeurId,
      id: DateShowShop.id.toString()
    };
    this.open();
  }

  updateShop() {
    const body: ReqUpdateShop = {
      id: Number(this.ngCreate.id),
      name: this.ngCreate.name,
      status: this.ngCreate.status,
      la: this.ngCreate.la,
      long: this.ngCreate.long
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

  clearForm() {
    this.ngCreate = {
      name: '',
      status: '',
      la: '',
      long: '',
      chauffeurId: '',
      id: ''
    };
  }

}
interface SwitchPage {
  page: number;
}

