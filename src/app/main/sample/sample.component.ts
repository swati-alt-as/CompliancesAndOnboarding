import { Component, OnInit } from '@angular/core'

import { locale as en } from './i18n/en'
import { locale as fr } from './i18n/fr'
import { locale as de } from './i18n/de'
import { locale as pt } from './i18n/pt'

import { CoreTranslationService } from '@core/services/translation.service'
import { LeadsService } from '../../services/business/leads.service';
import { ToastrserviceService } from '../../services/notification/toastrservice.service'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  public contentHeader: object


  message: string;
  result: any = {};

  leadsList: any = {};
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  data: string;

  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private lead: LeadsService, private _coreTranslationService: CoreTranslationService) {
    this._coreTranslationService.translate(en, fr, de, pt)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/home'
          },
          {
            name: 'Leads',
            isLink: false
          }
        ]
      }
    }

    // this.spinnerService.show();
    this.lead.getAllLeads().subscribe((result) => {
      // this.spinnerService.hide();
      if (!(result["items"].length === 0)) {
        this.leadsList = result["items"];
        // console.log(this.leadsList)
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
