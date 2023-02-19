import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarCrudAssessmentItemComponent } from 'src/app/components/all-sar/sar-crud-assessment/sar-crud-assessment-item/sar-crud-assessment-item.component';
import { SarCrudAssessmentListComponent } from 'src/app/components/all-sar/sar-crud-assessment/sar-crud-assessment-list/sar-crud-assessment-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarCrudAssessmentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarCrudAssessmentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarCrudAssessmentRouting{}
