import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSupportListComponent } from './student-support-list/student-support-list.component';
import { StudentSupportItemComponent } from './student-support-item/student-support-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentSupportRouting } from './student-support-routing';
import { StudentSupportHasStudentListComponent } from './student-support-has-student/student-support-has-student-list.component';
@NgModule({
  declarations: [
    StudentSupportListComponent,
    StudentSupportItemComponent,
    StudentSupportHasStudentListComponent

  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentSupportRouting
  ],
  exports: [StudentSupportListComponent, StudentSupportItemComponent,StudentSupportRouting],
})
export class StudentSupportModule { }
