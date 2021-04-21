import { Component, OnInit } from '@angular/core';
import { ReqCreateShop, ReqShowShop, ResShowShop } from 'src/app/service-interface/interface-shop';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-component-shop',
  templateUrl: './component-shop.component.html',
  styleUrls: ['./component-shop.component.scss']
})
export class ComponentShopComponent implements OnInit {

  DataShop: ResShowShop = null;

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
  };

  constructor(private callApi: ApiserviceService) { }

  ngOnInit(): void {
    this.loadDataShop();
  }



  loadDataShop() {
    const body: ReqShowShop = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showDataShop(body).subscribe(
      (res) => {
        this.DataShop = res;
      }
    );
  }

  CreateDataShop() {
    const body: ReqCreateShop = {
      name: this.ngCreate.name,
      status: this.ngCreate.status,
      la: this.ngCreate.la,
      long: this.ngCreate.long,
      chauffeurId: Number(this.ngCreate.chauffeurId)
    };
  }

}
