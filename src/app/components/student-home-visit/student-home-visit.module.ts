import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeVisitListComponent } from './student-home-visit-list/student-home-visit-list.component';
import { StudentHomeVisitItemComponent } from './student-home-visit-item/student-home-visit-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentHomeVisitRouting } from './student-home-visit-routing';
@NgModule({
  declarations: [
    StudentHomeVisitListComponent,
    StudentHomeVisitItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentHomeVisitRouting
  ],
  exports: [StudentHomeVisitListComponent, StudentHomeVisitItemComponent,StudentHomeVisitRouting],
})
export class StudentHomeVisitModule { }
