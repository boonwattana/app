import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarStudentAssignListComponent } from './sar-student-assign-list/sar-student-assign-list.component';
import { SarStudentAssignItemComponent } from './sar-student-assign-item/sar-student-assign-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarStudentAssignRouting } from './sar-student-assign-routing';
@NgModule({
  declarations: [
    SarStudentAssignListComponent,
    SarStudentAssignItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarStudentAssignRouting
  ],
  exports: [SarStudentAssignListComponent, SarStudentAssignItemComponent,SarStudentAssignRouting],
})
export class SarStudentAssignModule { }
