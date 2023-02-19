import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentItemComponent } from './student-item/student-item.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentRouting } from './student-routing';
@NgModule({
  declarations: [
    StudentListComponent,
    StudentItemComponent,
    StudentViewComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentRouting
  ],
  exports: [StudentListComponent, StudentItemComponent,StudentViewComponent,StudentRouting],
})
export class StudentModule { }
