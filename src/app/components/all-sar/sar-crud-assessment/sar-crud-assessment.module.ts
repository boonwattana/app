import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarCrudAssessmentListComponent } from './sar-crud-assessment-list/sar-crud-assessment-list.component';
import { SarCrudAssessmentItemComponent } from './sar-crud-assessment-item/sar-crud-assessment-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarCrudAssessmentRouting } from './sar-crud-assessment-routing';
@NgModule({
  declarations: [
    SarCrudAssessmentListComponent,
    SarCrudAssessmentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarCrudAssessmentRouting
  ],
  exports: [SarCrudAssessmentListComponent, SarCrudAssessmentItemComponent,SarCrudAssessmentRouting],
})
export class SarCrudAssessmentModule { }
