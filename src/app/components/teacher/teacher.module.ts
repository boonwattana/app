import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherItemComponent } from './teacher-item/teacher-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { TeacherRouting } from './teacher-routing';
@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   TeacherRouting
  ],
  exports: [TeacherListComponent, TeacherItemComponent,TeacherRouting],
})
export class TeacherModule { }
