import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentItemComponent } from 'src/app/components/student/student-item/student-item.component';
import { StudentListComponent } from 'src/app/components/student/student-list/student-list.component';
import { StudentViewComponent } from 'src/app/components/student/student-view/student-view.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StudentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentItemComponent ,canActivate:[AuthGuard]},
   { path: 'view/:id', component: StudentViewComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentRouting{}
