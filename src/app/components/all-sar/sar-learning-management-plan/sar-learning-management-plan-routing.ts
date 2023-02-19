import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarLearningManagementPlanItemComponent } from 'src/app/components/all-sar/sar-learning-management-plan/sar-learning-management-plan-item/sar-learning-management-plan-item.component';
import { SarLearningManagementPlanListComponent } from 'src/app/components/all-sar/sar-learning-management-plan/sar-learning-management-plan-list/sar-learning-management-plan-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarLearningManagementPlanListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarLearningManagementPlanItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarLearningManagementPlanRouting{}
