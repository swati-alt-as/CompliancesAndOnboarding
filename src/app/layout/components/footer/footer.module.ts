import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { FooterComponent } from 'app/layout/components/footer/footer.component';
import { ScrollTopComponent } from 'app/layout/components/footer/scroll-to-top/scroll-top.component';

import { NgxSpinnerModule } from "ngx-spinner"; 
   
@NgModule({
  declarations: [FooterComponent, ScrollTopComponent],
  imports: [RouterModule, CoreCommonModule,NgxSpinnerModule,],
  exports: [FooterComponent]
})
export class FooterModule {}
