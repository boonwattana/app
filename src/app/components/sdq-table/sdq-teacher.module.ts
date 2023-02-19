import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdqTeacherListComponent } from './sdq-teacher-list/sdq-teacher-list.component';
import { SdqTeacherItemComponent } from './sdq-teacher-item/sdq-teacher-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SdqTeacherRouting } from './sdq-teacher-routing';
@NgModule({
  declarations: [
    SdqTeacherItemComponent,
    SdqTeacherListComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SdqTeacherRouting
  ],
  exports: [SdqTeacherRouting,SdqTeacherItemComponent,SdqTeacherListComponent],
})
export class SdqTeacherModule { }
