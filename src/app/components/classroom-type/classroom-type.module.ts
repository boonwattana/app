import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomTypeListComponent } from './classroom-type-list/classroom-type-list.component';
import { ClassroomTypeItemComponent } from './classroom-type-item/classroom-type-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ClassroomTypeRouting } from './classroom-type-routing';
@NgModule({
  declarations: [
    ClassroomTypeListComponent,
    ClassroomTypeItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ClassroomTypeRouting
  ],
  exports: [ClassroomTypeListComponent, ClassroomTypeItemComponent,ClassroomTypeRouting],
})
export class ClassroomTypeModule { }
