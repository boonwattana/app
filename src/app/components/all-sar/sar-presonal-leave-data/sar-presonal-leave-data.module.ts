import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarPresonalLeaveDataListComponent } from './sar-presonal-leave-data-list/sar-presonal-leave-data-list.component';
import { SarPresonalLeaveDataItemComponent } from './sar-presonal-leave-data-item/sar-presonal-leave-data-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarPresonalLeaveDataRouting } from './sar-presonal-leave-data-routing';
@NgModule({
  declarations: [
    SarPresonalLeaveDataListComponent,
    SarPresonalLeaveDataItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarPresonalLeaveDataRouting
  ],
  exports: [SarPresonalLeaveDataListComponent, SarPresonalLeaveDataItemComponent,SarPresonalLeaveDataRouting],
})
export class SarPresonalLeaveDataModule { }
