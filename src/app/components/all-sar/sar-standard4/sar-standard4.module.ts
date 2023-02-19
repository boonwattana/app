import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarStandard4ListComponent } from './sar-standard4-list/sar-standard4-list.component';
import { SarStandard4ItemComponent } from './sar-standard4-item/sar-standard4-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarStandard4Routing } from './sar-standard4-routing';
@NgModule({
  declarations: [
    SarStandard4ListComponent,
    SarStandard4ItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarStandard4Routing
  ],
  exports: [SarStandard4ListComponent, SarStandard4ItemComponent,SarStandard4Routing],
})
export class SarStandard4Module { }
