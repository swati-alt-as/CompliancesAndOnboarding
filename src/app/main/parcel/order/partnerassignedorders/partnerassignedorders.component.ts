import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { CoreTranslationService } from '@core/services/translation.service';
import { locale as en } from '../../../../main/sample/i18n/en';
import { OrderserviceService } from '../../../../services/parcel/order/orderservice.service';
import { ToastrserviceService } from '../../../../services/notification/toastrservice.service';

@Component({
  selector: 'app-partnerassignedorders',
  templateUrl: './partnerassignedorders.component.html',
  styleUrls: ['./partnerassignedorders.component.scss']
})
export class PartnerassignedordersComponent implements OnInit {

  public contentHeader: object;

  message: string;
  result: any = [];

  ordersList: any = [];
  getDetails: any = [];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;

  constructor(private order: OrderserviceService, private _coreTranslationService: CoreTranslationService, private spinnerService: NgxSpinnerService, private modalService: NgbModal, private toastr: ToastrserviceService) {
    this._coreTranslationService.translate(en)
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Parcel',
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
            name: 'Order',
            isLink: false
          }
        ]
      }
    }

    this.spinnerService.show();
    this.order.getOrdersByType('partnerAssigned').subscribe((result) => {
      this.spinnerService.hide();
      if (!(result["items"].length === 0)) {
        this.ordersList = result["items"];
        console.log(this.ordersList)
        this.count = result["items"].length;
      }
    })

  }

  // modal Open Success
  getOrderDetails(modalSuccess, ORDERID: any) {
    this.spinnerService.show();
    this.order.getDetails(ORDERID).subscribe((res) => {
      this.spinnerService.hide();
      if (res["status"] == true && !(res["items"].length === 0)) {
        this.message = res["message"];
        this.getDetails = res["items"];
        console.log(this.getDetails)
        this.modalService.open(modalSuccess, {
          centered: true,
          size: 'lg',
          scrollable: true,
          windowClass: 'modal modal-success'
        });
      } else if (res["status"] == false) {
        this.message = res["message"];
        this.toastr.showError(this.message, "Error!")
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        this.toastr.showError("Something Went Wrong", "Error!")
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.showInfo(error.error.message, "Information!")
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
