import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherWorkItemComponent } from 'src/app/components/teacher-work/teacher-work-item/teacher-work-item.component';
import { TeacherWorkListComponent } from 'src/app/components/teacher-work/teacher-work-list/teacher-work-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: TeacherWorkListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: TeacherWorkItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeacherWorkRouting{}
