import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarStandard3ListComponent } from './sar-standard3-list/sar-standard3-list.component';
import { SarStandard3ItemComponent } from './sar-standard3-item/sar-standard3-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarStandard3Routing } from './sar-standard3-routing';
@NgModule({
  declarations: [
    SarStandard3ListComponent,
    SarStandard3ItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarStandard3Routing
  ],
  exports: [SarStandard3ListComponent, SarStandard3ItemComponent,SarStandard3Routing],
})
export class SarStandard3Module { }
