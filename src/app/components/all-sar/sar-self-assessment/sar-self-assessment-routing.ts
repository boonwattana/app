import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarSelfAssessmentItemComponent } from 'src/app/components/all-sar/sar-self-assessment/sar-self-assessment-item/sar-self-assessment-item.component';
import { SarSelfAssessmentListComponent } from 'src/app/components/all-sar/sar-self-assessment/sar-self-assessment-list/sar-self-assessment-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarSelfAssessmentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarSelfAssessmentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarSelfAssessmentRouting{}
