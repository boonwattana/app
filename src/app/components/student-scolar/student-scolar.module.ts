import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentScolarListComponent } from './student-scolar-list/student-scolar-list.component';
import { StudentScolarItemComponent } from './student-scolar-item/student-scolar-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentScolarRouting } from './student-scolar-routing';
@NgModule({
  declarations: [
    StudentScolarListComponent,
    StudentScolarItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentScolarRouting
  ],
  exports: [StudentScolarListComponent, StudentScolarItemComponent,StudentScolarRouting],
})
export class StudentScolarModule { }
