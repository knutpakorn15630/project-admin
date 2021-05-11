import { Component, Injectable, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { ReqCreateReport, ReqReport, ReqSearchDate, ReqSearchReport, ResCreateReport, ResGetChauffeur, ResGetDataChauffeur, ResGetShop, ResReport, ResSum } from 'src/app/service-interface/interface-report';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
declare var $: any;

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  NumberOne: number;


  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10),

      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}


@Component({
  selector: 'app-component-report',
  templateUrl: './component-report.component.html',
  styleUrls: ['./component-report.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ComponentReportComponent implements OnInit {
  model2: string;
  model3: string;

  DataReport: ResReport = null;

  dataCreate: ResCreateReport = null;

  GetShop: ResGetShop = null;

  GetDelivery: ResGetChauffeur = null;

  testNumber: number;

  totalNumber: ResSum = null;

  testNum = 'qwertyuiop';
  eliteNumber = [];
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
    total: 100,
    testNumber: 1000000,
    shopName: '',
    checkDate: '',
    ResponsibleName: ''
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

  constructor(private callApi: ApiserviceService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {
    this.showReport();
    console.log(moment().format('LLLL'));
    this.sumReport();
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  sumReport() {
    this.callApi.sumReport().subscribe(
      (res) => {
        this.totalNumber = res;
        console.log(`this sum ${this.totalNumber}`);
      }
    );
  }

  searchReport() {
    const body: ReqSearchReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang,
      shopName: this.ngPang.shopName,
      checkDate: this.model2,
      ResponsibleName: this.ngPang.ResponsibleName
    };

    setTimeout(() => {
      this.callApi.searchReport(body).subscribe(
        (res) => {
          this.DataReport = res;
        }
      );
    }, 500);

  }

  searchReportDate() {
    const body: ReqSearchDate = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang,
      startDate: this.model2,
      endDate: this.model3
    };
    if (!this.model2 && !this.model3) {
      return;
    }
    setTimeout(() => {
      this.callApi.searchReportDate(body).subscribe(
        (res) => {
          this.DataReport = res;
        }
      );
    }, 500);
  }

  showReport() {
    const body: ReqReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showReport(body).subscribe(
      (res) => {
        this.DataReport = res;
        // tslint:disable-next-line:prefer-const
        this.setPageTotal(this.DataReport.totalPages);
      }
    );
  }

  createReport() {
    const ChuId = this.GetDelivery.data.find((x) => x.id + ' ' + x.firstName + ' ' + x.lastName === this.ngReport.chauffeurId);
    const shopId = this.GetShop.data.find((x) => x.id + ' ' + x.name === this.ngReport.shopId);
    console.log('this is chu -------->', ChuId);
    console.log('this is sho -------->', shopId);

    const body: ReqCreateReport = {
      title: shopId.name,
      material: this.ngReport.material,
      ResponsibleName: ChuId.firstName + ' ' + ChuId.lastName,
      chauffeurId: ChuId.id,
      shopId: shopId.id
      // tslint:disable-next-line:align
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
        };
        this.showReport();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  deleteReport(id: number) {
    this.callApi.DeleteReport(id).subscribe(
      (res) => {

      },
      (err) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลบสำเร็จเรียบร้อยแล้ว'
        });
        this.showReport();
        console.log(err);
      }
    );
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
      this.showReport();
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

