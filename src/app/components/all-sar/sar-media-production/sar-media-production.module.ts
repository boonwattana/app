import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarMediaProductionListComponent } from './sar-media-production-list/sar-media-production-list.component';
import { SarMediaProductionItemComponent } from './sar-media-production-item/sar-media-production-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarMediaProductionRouting } from './sar-media-production-routing';
@NgModule({
  declarations: [
    SarMediaProductionListComponent,
    SarMediaProductionItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarMediaProductionRouting
  ],
  exports: [SarMediaProductionListComponent, SarMediaProductionItemComponent,SarMediaProductionRouting],
})
export class SarMediaProductionModule { }
