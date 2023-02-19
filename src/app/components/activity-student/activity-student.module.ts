import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityStudentListComponent } from './activity-student-list/activity-student-list.component';
import { ActivityStudentItemComponent } from './activity-student-item/activity-student-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ActivityStudentRouting } from './activity-student-routing';
@NgModule({
  declarations: [
    ActivityStudentListComponent,
    ActivityStudentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ActivityStudentRouting
  ],
  exports: [ActivityStudentListComponent, ActivityStudentItemComponent,ActivityStudentRouting],
})
export class ActivityStudentModule { }
