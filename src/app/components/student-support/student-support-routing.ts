import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSupportItemComponent } from 'src/app/components/student-support/student-support-item/student-support-item.component';
import { StudentSupportListComponent } from 'src/app/components/student-support/student-support-list/student-support-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentSupportListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentSupportItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentSupportRouting{}
