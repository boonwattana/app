import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHelpListComponent } from './student-help-list/student-help-list.component';
import { StudentHelpItemComponent } from './student-help-item/student-help-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentHelpRouting } from './student-help-routing';
@NgModule({
  declarations: [
    StudentHelpListComponent,
    StudentHelpItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StudentHelpRouting
  ],
  exports: [StudentHelpListComponent, StudentHelpItemComponent,StudentHelpRouting],
})
export class StudentHelpModule { }
