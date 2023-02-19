import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFilterListComponent } from './student-filter-list/student-filter-list.component';
import { StudentFilterItemComponent } from './student-filter-item/student-filter-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentFilterRouting } from './student-filter-routing';
@NgModule({
  declarations: [
    StudentFilterListComponent,
    StudentFilterItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentFilterRouting
  ],
  exports: [StudentFilterListComponent, StudentFilterItemComponent,StudentFilterRouting],
})
export class StudentFilterModule { }
