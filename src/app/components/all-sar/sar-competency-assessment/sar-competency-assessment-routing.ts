import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarCompetencyAssessmentItemComponent } from 'src/app/components/all-sar/sar-competency-assessment/sar-competency-assessment-item/sar-competency-assessment-item.component';
import { SarCompetencyAssessmentListComponent } from 'src/app/components/all-sar/sar-competency-assessment/sar-competency-assessment-list/sar-competency-assessment-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarCompetencyAssessmentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarCompetencyAssessmentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarCompetencyAssessmentRouting{}
