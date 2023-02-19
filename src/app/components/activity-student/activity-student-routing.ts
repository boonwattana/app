import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityStudentItemComponent } from 'src/app/components/activity-student/activity-student-item/activity-student-item.component';
import { ActivityStudentListComponent } from 'src/app/components/activity-student/activity-student-list/activity-student-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ActivityStudentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ActivityStudentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActivityStudentRouting{}
