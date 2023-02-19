import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarCompetencyAssessmentListComponent } from './sar-competency-assessment-list/sar-competency-assessment-list.component';
import { SarCompetencyAssessmentItemComponent } from './sar-competency-assessment-item/sar-competency-assessment-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarCompetencyAssessmentRouting } from './sar-competency-assessment-routing';
@NgModule({
  declarations: [
    SarCompetencyAssessmentListComponent,
    SarCompetencyAssessmentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarCompetencyAssessmentRouting
  ],
  exports: [SarCompetencyAssessmentListComponent, SarCompetencyAssessmentItemComponent,SarCompetencyAssessmentRouting],
})
export class SarCompetencyAssessmentModule { }
