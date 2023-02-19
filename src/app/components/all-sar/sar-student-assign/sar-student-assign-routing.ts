import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarStudentAssignItemComponent } from 'src/app/components/all-sar/sar-student-assign/sar-student-assign-item/sar-student-assign-item.component';
import { SarStudentAssignListComponent } from 'src/app/components/all-sar/sar-student-assign/sar-student-assign-list/sar-student-assign-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarStudentAssignListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarStudentAssignItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarStudentAssignRouting{}
