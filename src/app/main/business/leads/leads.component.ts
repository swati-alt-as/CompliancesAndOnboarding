import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { CoreTranslationService } from '@core/services/translation.service';
import { locale as en } from '../../../main/sample/i18n/en';
import { LeadsService } from '../../../services/business/leads.service';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  public contentHeader: object;

  message: string;
  result: any = [];

  leadsList: any = [];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;

  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private lead: LeadsService, private _coreTranslationService: CoreTranslationService, private spinnerService: NgxSpinnerService) {
    this._coreTranslationService.translate(en)
  }
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Home',
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
            name: 'Leads',
            isLink: false
          }
        ]
      }
    }
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.spinnerService.show();
    this.lead.getAllLeads().subscribe((result) => {
      this.spinnerService.hide();
      if (result["items"].length !== 0) {
        this.leadsList = result["items"];
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
