import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule } from '@agm/core';

import { AuthGuard } from '../../../guards/auth.guard';

import { PendingorderComponent } from './pendingorder/pendingorder.component';
import { RejectedordersComponent } from './rejectedorders/rejectedorders.component';
import { DeliveredordersComponent } from './deliveredorders/deliveredorders.component';
import { PartnerassignedordersComponent } from './partnerassignedorders/partnerassignedorders.component';
import { DraftlistComponent } from './draftlist/draftlist.component';
import { OutforpickupComponent } from './outforpickup/outforpickup.component';
import { ReachedpickupComponent } from './reachedpickup/reachedpickup.component';
import { PickedupComponent } from './pickedup/pickedup.component';
import { OutfordeliveryComponent } from './outfordelivery/outfordelivery.component';
import { ReacheddeliveryComponent } from './reacheddelivery/reacheddelivery.component';


// mqtt 
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'z8c8894c.ap-southeast-1.emqx.cloud',
  protocol: 'wss',
  username: 'fab',
  password: 'fablo',
  port: 8084,
  path: '/mqtt'
}

// push notification 
import { PushNotificationsService } from 'ng-push';

const routes = [
  {
    path: 'drafts',
    component: DraftlistComponent, canActivate: [AuthGuard],
    data: { animation: 'drafts' }
  },
  {
    path: 'pending_order',
    component: PendingorderComponent, canActivate: [AuthGuard],
    data: { animation: 'pending_order' }
  },
  {
    path: 'rejected_order',
    component: RejectedordersComponent, canActivate: [AuthGuard],
    data: { animation: 'rejected_order' }
  },
  {
    path: 'partnerassign_order',
    component: PartnerassignedordersComponent, canActivate: [AuthGuard],
    data: { animation: 'partnerassign_order' }
  },
  {
    path: 'delivered_order',
    component: DeliveredordersComponent, canActivate: [AuthGuard],
    data: { animation: 'delivered_order' }
  },
  {
    path: 'outforpickuporder',
    component: OutforpickupComponent, canActivate: [AuthGuard],
    data: { animation: 'outforpickuporder' }
  },
  {
    path: 'reachedpickuporder',
    component: ReachedpickupComponent, canActivate: [AuthGuard],
    data: { animation: 'reachedpickuporder' }
  },
  {
    path: 'pickeduporder',
    component: PickedupComponent, canActivate: [AuthGuard],
    data: { animation: 'pickeduporder' }
  },
  {
    path: 'outfordelivery',
    component: OutfordeliveryComponent, canActivate: [AuthGuard],
    data: { animation: 'outfordelivery' }
  },
  {
    path: 'reacheddelivery',
    component: ReacheddeliveryComponent, canActivate: [AuthGuard],
    data: { animation: 'reacheddelivery' }
  },
];

@NgModule({
  declarations: [
    PendingorderComponent,
    RejectedordersComponent,
    DeliveredordersComponent,
    PartnerassignedordersComponent,
    DraftlistComponent,
    OutforpickupComponent,
    ReachedpickupComponent,
    PickedupComponent,
    OutfordeliveryComponent,
    ReacheddeliveryComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,

    // mqtt 
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),

    //google map
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCF2nDajDvyOuusKeaC8KYfPzhAWmolgMo'
    }),
  ],
  
  providers: [
    // push notification 
    PushNotificationsService,
  ],
  exports: [
    PendingorderComponent,
    RejectedordersComponent,
    DeliveredordersComponent,
    PartnerassignedordersComponent,
    DraftlistComponent,
    OutforpickupComponent,
    ReachedpickupComponent,
    PickedupComponent,
    OutfordeliveryComponent,
    ReacheddeliveryComponent
  ]
})
export class OrderModule { }
