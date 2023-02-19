import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarStudentEstimateTeachingItemComponent } from 'src/app/components/all-sar/sar-student-estimate-teaching/sar-student-estimate-teaching-item/sar-student-estimate-teaching-item.component';
import { SarStudentEstimateTeachingListComponent } from 'src/app/components/all-sar/sar-student-estimate-teaching/sar-student-estimate-teaching-list/sar-student-estimate-teaching-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarStudentEstimateTeachingListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarStudentEstimateTeachingItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarStudentEstimateTeachingRouting{}
