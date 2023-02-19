import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarStandard2ListComponent } from './sar-standard2-list/sar-standard2-list.component';
import { SarStandard2ItemComponent } from './sar-standard2-item/sar-standard2-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarStandard2Routing } from './sar-standard2-routing';
@NgModule({
  declarations: [
    SarStandard2ListComponent,
    SarStandard2ItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarStandard2Routing
  ],
  exports: [SarStandard2ListComponent, SarStandard2ItemComponent,SarStandard2Routing],
})
export class SarStandard2Module { }
