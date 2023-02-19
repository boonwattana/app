import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeVisitItemComponent } from 'src/app/components/student-home-visit/student-home-visit-item/student-home-visit-item.component';
import { StudentHomeVisitListComponent } from 'src/app/components/student-home-visit/student-home-visit-list/student-home-visit-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentHomeVisitListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentHomeVisitItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentHomeVisitRouting{}
