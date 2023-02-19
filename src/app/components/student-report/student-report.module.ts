import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentListReportComponent } from './student-list-report/student-list-report.component';
import { StudentReportRouting } from './student-report-routing';

@NgModule({
  declarations: [
    StudentListReportComponent,
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentReportRouting
  ],
  exports: [StudentListReportComponent, StudentReportRouting],
})
export class StudentReportModule { }
