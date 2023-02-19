import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomItemComponent } from './classroom-item/classroom-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ClassroomRouting } from './classroom-routing';
@NgModule({
  declarations: [
    ClassroomListComponent,
    ClassroomItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ClassroomRouting
  ],
  exports: [ClassroomListComponent, ClassroomItemComponent,ClassroomRouting],
})
export class ClassroomModule { }
