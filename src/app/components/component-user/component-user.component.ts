import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResShowUser } from 'src/app/service-interface/interface-user';
import { ApiServiceService } from 'src/app/services/api-service.service';


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

  // tslint:disable-next-line:max-line-length
  constructor(config: NgbPaginationConfig, config2: NgbModalConfig, private modalService: NgbModal, private apiUserService: ApiServiceService) {
    config.size = 'sm';
    config.boundaryLinks = true;
    config2.backdrop = 'static';
    config2.keyboard = false;
  }

  ngOnInit(): void {

  }

  // loadDataUser() {
  //   this.apiUserService.showUser().subscribe(
  //     (res) => {
  //       this.DataUser = res;
  //       console.log('res ', this.DataUser);
  //       console.log('this is log ------>>>', this.DataUser.data);
  //     }
  //   );
  // }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
