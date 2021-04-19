import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReqReport, ResReport } from 'src/app/service-interface/interface-report';
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

  ngMember2 = {
    title: '',
    material: '',
    ResponsibleName: '',
  };

  ngPang = {
    perPage: 10,
    Pang: 1
  };

  constructor(config: NgbPaginationConfig, config2: NgbModalConfig, private modalService: NgbModal, private callApi: ApiserviceService) { }

  ngOnInit(): void {
    this.showReport();
  }

  showReport() {
    const body: ReqReport = {
      perPage: this.ngPang.perPage,
      page: this.ngPang.Pang
    };
    this.callApi.showReport(body).subscribe(
      (res) => {
        this.DataReport = res;
      }
    );
  }


  EmptyData() {
    this.ngMember2 = {
      title: '',
      material: '',
      ResponsibleName: '',
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
