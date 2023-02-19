import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarStudentEstimateTeachingListComponent } from './sar-student-estimate-teaching-list/sar-student-estimate-teaching-list.component';
import { SarStudentEstimateTeachingItemComponent } from './sar-student-estimate-teaching-item/sar-student-estimate-teaching-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarStudentEstimateTeachingRouting } from './sar-student-estimate-teaching-routing';
@NgModule({
  declarations: [
    SarStudentEstimateTeachingListComponent,
    SarStudentEstimateTeachingItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarStudentEstimateTeachingRouting
  ],
  exports: [SarStudentEstimateTeachingListComponent, SarStudentEstimateTeachingItemComponent,SarStudentEstimateTeachingRouting],
})
export class SarStudentEstimateTeachingModule { }
