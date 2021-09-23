import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig  } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { cloneDeep } from 'lodash';
import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
// import * as snippet from 'app/main/extensions/toastr/toastr.snippetcode';

@Injectable({
  providedIn: 'root'
})
export class ToastrserviceService {

  private options: GlobalConfig;

  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
   }

 
  showSuccess(message: any, title: any) {    
    this.toastr.success(message, title)
  }


  showError(message: any, title: any) {    
    this.toastr.error(message, title)
  }

  showInfo(message: any, title: any) {    
    this.toastr.info(message, title)
  }

  showWarning(message: any, title: any) {    
    this.toastr.warning(message, title)
  }

}
