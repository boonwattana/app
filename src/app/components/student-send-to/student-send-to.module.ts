import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StudentSendToItemComponent } from './student-send-to-item/student-send-to-item.component';
import { StudentSendToListComponent } from './student-send-to-list/student-send-to-list.component';
import { StudentSendToRouting } from './student-send-to-routing';
@NgModule({
  declarations: [
    StudentSendToListComponent,
    StudentSendToItemComponent
  ],
  imports: [
    CommonModule,
    SharedWidgetModule,
    StudentSendToRouting
  ],
  exports: [StudentSendToListComponent, StudentSendToItemComponent, StudentSendToRouting],
})
export class StudentSendToModule { }
