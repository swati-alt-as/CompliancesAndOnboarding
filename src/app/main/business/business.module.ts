import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from '../../guards/auth.guard';
import { LeadsComponent } from './leads/leads.component';                                                                                    
import { BusinessregistrationComponent } from './businessregistration/businessregistration.component';  

const routes = [  
  {
    path: 'leads',
    component: LeadsComponent, canActivate : [AuthGuard],
    data: { animation: 'leads' }
  },
  {
    path: 'businessregister',
    component: BusinessregistrationComponent, canActivate : [AuthGuard],
    data: { animation: 'businessregister' }
  }
];

@NgModule({
  declarations: [
    LeadsComponent,
    BusinessregistrationComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
  ],
  exports: [LeadsComponent,BusinessregistrationComponent]
})
export class BusinessModule { }
