import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';
import { BusinessModule } from 'app/main/business/business.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// for globar variables
import { environment } from "../environments/environment";

// for firebase database

import { AngularFireModule } from "@angular/fire/compat";
import {
  AngularFireStorageModule,
  // StorageBucket
} from "@angular/fire/compat/storage";
import 'firebase/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// search and pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from 'angular-datatables';

//googlemap
import { AgmCoreModule } from '@agm/core';

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

// routes for modules
const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(pageModule => pageModule.PagesModule)
  },
  {
    path: 'parcel/order',
    loadChildren: () => import('./main/parcel/order/order.module').then(parcelModule => parcelModule.OrderModule)
  },
  {
    path: 'delivery_partner',
    loadChildren: () => import('./main/deliverypartner/verification/verification.module').then(deliveryModule => deliveryModule.VerificationModule)
  },
  {
    path: 'delivery_partner/register',
    loadChildren: () => import('./main/deliverypartner/ragistration/ragistration.module').then(registerModule => registerModule.RagistrationModule)
  },
  {
    path: '',
    redirectTo: '/pages/authentication/login',   // Login
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //pagination
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    DataTablesModule,

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 5 seconds
      progressBar: true,
    }),

    // mqtt 
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,
    DashboardModule,
    BusinessModule,
    FormsModule,
    ReactiveFormsModule,
    
    //firebase
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),

    //firestore
    AngularFirestoreModule,
    
    //googlemap
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCF2nDajDvyOuusKeaC8KYfPzhAWmolgMo',
      // mapId:"4189679bf36cbd45"
    })

  ],

  providers: [
    // push notification 
    PushNotificationsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
