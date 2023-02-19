import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarLearningManagementPlanListComponent } from './sar-learning-management-plan-list/sar-learning-management-plan-list.component';
import { SarLearningManagementPlanItemComponent } from './sar-learning-management-plan-item/sar-learning-management-plan-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarLearningManagementPlanRouting } from './sar-learning-management-plan-routing';
@NgModule({
  declarations: [
    SarLearningManagementPlanListComponent,
    SarLearningManagementPlanItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarLearningManagementPlanRouting
  ],
  exports: [SarLearningManagementPlanListComponent, SarLearningManagementPlanItemComponent,SarLearningManagementPlanRouting],
})
export class SarLearningManagementPlanModule { }
