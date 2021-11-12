import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from '../../../guards/auth.guard';

import { PendingverificationComponent } from './pendingverification/pendingverification.component';

const routes = [  
  {
    path: 'pending_verification',
    component: PendingverificationComponent, canActivate : [AuthGuard],
    data: { animation: 'pending_verification' }
  },
];

@NgModule({
  declarations: [PendingverificationComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
  ],
  exports:[PendingverificationComponent]
})
export class VerificationModule { }
