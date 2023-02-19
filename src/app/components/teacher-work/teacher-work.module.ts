import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherWorkListComponent } from './teacher-work-list/teacher-work-list.component';
import { TeacherWorkItemComponent } from './teacher-work-item/teacher-work-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { TeacherWorkRouting } from './teacher-work-routing';
@NgModule({
  declarations: [
    TeacherWorkListComponent,
    TeacherWorkItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   TeacherWorkRouting
  ],
  exports: [TeacherWorkListComponent, TeacherWorkItemComponent,TeacherWorkRouting],
})
export class TeacherWorkModule { }
