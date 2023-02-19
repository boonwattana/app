import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentConsultantItemComponent } from 'src/app/components/student-consultant/student-consultant-item/student-consultant-item.component';
import { StudentConsultantListComponent } from 'src/app/components/student-consultant/student-consultant-list/student-consultant-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentConsultantListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentConsultantItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentConsultantRouting{}
