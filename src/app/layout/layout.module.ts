import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomBreakPointsProvider } from 'app/layout/custom-breakpoints';
import { VerticalLayoutModule } from 'app/layout/vertical/vertical-layout.module';
import { HorizontalLayoutModule } from 'app/layout/horizontal/horizontal-layout.module';
import { NgxSpinnerModule } from "ngx-spinner";    

@NgModule({
  imports: [FlexLayoutModule.withConfig({ disableDefaultBps: true }), VerticalLayoutModule, HorizontalLayoutModule, NgxSpinnerModule,],
  providers: [CustomBreakPointsProvider],
  exports: [VerticalLayoutModule, HorizontalLayoutModule]
})
export class LayoutModule {}

