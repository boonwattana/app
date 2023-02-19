import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckStudentItemComponent } from 'src/app/components/check-student/check-student-item/check-student-item.component';
import { CheckStudentListComponent } from 'src/app/components/check-student/check-student-list/check-student-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: CheckStudentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: CheckStudentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckStudentRouting{}
