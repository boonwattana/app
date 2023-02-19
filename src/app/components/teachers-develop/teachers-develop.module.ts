import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersDevelopListComponent } from './teachers-develop-list/teachers-develop-list.component';
import { TeachersDevelopItemComponent } from './teachers-develop-item/teachers-develop-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { TeachersDevelopRouting } from './teachers-develop-routing';
@NgModule({
  declarations: [
    TeachersDevelopListComponent,
    TeachersDevelopItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   TeachersDevelopRouting
  ],
  exports: [TeachersDevelopListComponent, TeachersDevelopItemComponent,TeachersDevelopRouting],
})
export class TeachersDevelopModule { }
