import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachingScheduleListComponent } from './teaching-schedule-list/teaching-schedule-list.component';
import { TeachingScheduleItemComponent } from './teaching-schedule-item/teaching-schedule-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { TeachingScheduleRouting } from './teaching-schedule-routing';
@NgModule({
  declarations: [
    TeachingScheduleListComponent,
    TeachingScheduleItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   TeachingScheduleRouting
  ],
  exports: [TeachingScheduleListComponent, TeachingScheduleItemComponent,TeachingScheduleRouting],
})
export class TeachingScheduleModule { }
