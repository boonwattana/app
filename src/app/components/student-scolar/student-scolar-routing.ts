import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentScolarItemComponent } from 'src/app/components/student-scolar/student-scolar-item/student-scolar-item.component';
import { StudentScolarListComponent } from 'src/app/components/student-scolar/student-scolar-list/student-scolar-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentScolarListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentScolarItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentScolarRouting{}
