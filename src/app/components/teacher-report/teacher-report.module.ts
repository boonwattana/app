import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { TeacherListReportComponent } from './teacher-list-report/teacher-list-report.component';
import { TeacherReportRouting } from './teacher-report-routing';

@NgModule({
  declarations: [
    TeacherListReportComponent,
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   TeacherReportRouting
  ],
  exports: [TeacherListReportComponent,TeacherReportRouting],
})
export class TeacherReportModule { }
