import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarTeachingScheduleListComponent } from './sar-teaching-schedule-list/sar-teaching-schedule-list.component';
import { SarTeachingScheduleItemComponent } from './sar-teaching-schedule-item/sar-teaching-schedule-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarTeachingScheduleRouting } from './sar-teaching-schedule-routing';
@NgModule({
  declarations: [
    SarTeachingScheduleListComponent,
    SarTeachingScheduleItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarTeachingScheduleRouting
  ],
  exports: [SarTeachingScheduleListComponent, SarTeachingScheduleItemComponent,SarTeachingScheduleRouting],
})
export class SarTeachingScheduleModule { }
