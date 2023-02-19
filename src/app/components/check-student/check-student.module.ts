import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckStudentListComponent } from './check-student-list/check-student-list.component';
import { CheckStudentItemComponent } from './check-student-item/check-student-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { CheckStudentRouting } from './check-student-routing';
@NgModule({
  declarations: [
    CheckStudentListComponent,
    CheckStudentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   CheckStudentRouting
  ],
  exports: [CheckStudentListComponent, CheckStudentItemComponent,CheckStudentRouting],
})
export class CheckStudentModule { }
