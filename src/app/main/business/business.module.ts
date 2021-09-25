import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads/leads.component';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from '../../guards/auth.guard';  

const routes = [  
  {
    path: 'leads',
    component: LeadsComponent, canActivate : [AuthGuard],
    data: { animation: 'leads' }
  }
];

@NgModule({
  declarations: [
    LeadsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
  ],
  exports: [LeadsComponent]
})
export class BusinessModule { }
