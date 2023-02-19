import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHelpItemComponent } from 'src/app/components/student-help/student-help-item/student-help-item.component';
import { StudentHelpListComponent } from 'src/app/components/student-help/student-help-list/student-help-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentHelpListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentHelpItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentHelpRouting{}
