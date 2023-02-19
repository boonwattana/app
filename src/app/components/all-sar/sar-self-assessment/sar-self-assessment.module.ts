import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarSelfAssessmentListComponent } from './sar-self-assessment-list/sar-self-assessment-list.component';
import { SarSelfAssessmentItemComponent } from './sar-self-assessment-item/sar-self-assessment-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarSelfAssessmentRouting } from './sar-self-assessment-routing';
@NgModule({
  declarations: [
    SarSelfAssessmentListComponent,
    SarSelfAssessmentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarSelfAssessmentRouting
  ],
  exports: [SarSelfAssessmentListComponent, SarSelfAssessmentItemComponent,SarSelfAssessmentRouting],
})
export class SarSelfAssessmentModule { }
