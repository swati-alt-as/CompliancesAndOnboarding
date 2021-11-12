import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { locale as en } from '../../../../main/sample/i18n/en';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DeliveryserviceService } from '../../../../services/deliverypartner/deliveryservice.service';
import { ToastrserviceService } from '../../../../services/notification/toastrservice.service'

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  public contentHeader: object
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;

  // @ViewChild(MatSort) sort: MatSort;

  message: string;
  result: any = [];

  partnerDetails: any = [];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;

  constructor(private delivery: DeliveryserviceService, private modalService: NgbModal, private _coreTranslationService: CoreTranslationService, private spinnerService: NgxSpinnerService, private toastr: ToastrserviceService) {
    this._coreTranslationService.translate(en)
  }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Leads',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard'
          },
          {
            name: 'Delivery Partner Leads',
            isLink: false
          }
        ]
      }
    }

    this.spinnerService.show();
    this.delivery.getAll().subscribe((result) => {
      this.spinnerService.hide();
      if (result["items"].length !== 0) {
        this.partnerDetails = result["items"];
        this.count = result["items"].length;
      }
    })

  }

  
  handlePageChange(event: number): void {
    this.page = event;
    this.ngOnInit();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }



}
