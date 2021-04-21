import { Component, OnInit } from '@angular/core';
import { ReqCreateReport, ReqReport, ResCreateReport, ResGetChauffeur, ResGetDataChauffeur, ResGetShop, ResReport } from 'src/app/service-interface/interface-report';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-component-report',
  templateUrl: './component-report.component.html',
  styleUrls: ['./component-report.component.scss']
})
export class ComponentReportComponent implements OnInit {

  DataReport: ResReport = null;

  dataCreate: ResCreateReport = null;

  GetShop: ResGetShop = null;

  GetDelivery: ResGetChauffeur = null;

  testNum = 'qwertyuiop';

  ngReport = {
    title: '',
    material: '',
    ResponsibleName: '',
    chauffeurId: '',
    shopId: ''
  };

  ngPang = {
    perPage: 10,
    Pang: 1,
    total: 100
  };

  constructor(private callApi: ApiserviceService) { }

  ngOnInit(): void {
    this.showReport();
    this.createResReport();
  }



  showReport() {
    const body: ReqReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showReport(body).subscribe(
      (res) => {
        this.DataReport = res;
        this.setPageTotal(this.DataReport.totalPages);
      }
    );
  }

  createReport() {
    const ChuId = this.GetDelivery.data.find((x) => x.id + ' ' + x.firstName + ' ' + x.lastName === this.ngReport.chauffeurId)
    const shopId = this.GetShop.data.find((x) => x.id + ' ' + x.name === this.ngReport.shopId)
    console.log('this is chu -------->', ChuId)
    console.log('this is sho -------->', shopId)

    const body: ReqCreateReport = {
      title: shopId.name,
      material: this.ngReport.material,
      ResponsibleName: ChuId.firstName + ' ' + ChuId.lastName,
      chauffeurId: ChuId.id,
      shopId: shopId.id
    }; this.callApi.createReport(body).subscribe(
      (res) => {
        this.dataCreate = res;
        $('#contentReport').modal('hide');
        this.ngReport = {
          title: '',
          material: '',
          ResponsibleName: '',
          chauffeurId: '',
          shopId: ''
        }
        this.showReport();
      },
      (err) => {
        console.log(err)
      }
      )


  }

  createResReport() {
    this.callApi.GetDataChauffeur().subscribe(
      (res) => {
        this.GetDelivery = res;
        console.log(res);
      }
    );
    this.callApi.GetDataShop().subscribe(
      (res) => {
        this.GetShop = res;
        console.log(res);
      }
    );
    // const body: ReqCreateReport = {
    //   title:
    //     material:
    //   ResponsibleName:
    //     chauffeurId:
    //   shopId:
    // };
    // this.callApi.createReport()
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
    }, 5);
  }


  EmptyData() {
    this.ngReport = {
      title: '',
      material: '',
      ResponsibleName: '',
      chauffeurId: '',
      shopId: ''
    };
  }

  hideModal() {
    $('#contentReport').modal('hide');
    this.EmptyData();
  }

  openLg() {
    $('#contentReport').modal('show');
  }

}


interface SwitchPage {
  page: number;
}

