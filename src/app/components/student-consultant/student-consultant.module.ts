import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentConsultantListComponent } from './student-consultant-list/student-consultant-list.component';
import { StudentConsultantItemComponent } from './student-consultant-item/student-consultant-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentConsultantRouting } from './student-consultant-routing';
@NgModule({
  declarations: [
    StudentConsultantListComponent,
    StudentConsultantItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentConsultantRouting
  ],
  exports: [StudentConsultantListComponent, StudentConsultantItemComponent,StudentConsultantRouting],
})
export class StudentConsultantModule { }
