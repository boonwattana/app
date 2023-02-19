import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherItemComponent } from 'src/app/components/teacher/teacher-item/teacher-item.component';
import { TeacherListComponent } from 'src/app/components/teacher/teacher-list/teacher-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { TeacherListReportComponent } from './teacher-list-report/teacher-list-report.component';
const routes: Routes = [
   { path: '', component: TeacherListReportComponent ,canActivate:[AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeacherReportRouting{}
