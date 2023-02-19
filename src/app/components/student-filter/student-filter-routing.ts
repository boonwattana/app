import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFilterItemComponent } from 'src/app/components/student-filter/student-filter-item/student-filter-item.component';
import { StudentFilterListComponent } from 'src/app/components/student-filter/student-filter-list/student-filter-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentFilterListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentFilterItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentFilterRouting{}
