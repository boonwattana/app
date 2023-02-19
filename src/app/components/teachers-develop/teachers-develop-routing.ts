import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersDevelopItemComponent } from 'src/app/components/teachers-develop/teachers-develop-item/teachers-develop-item.component';
import { TeachersDevelopListComponent } from 'src/app/components/teachers-develop/teachers-develop-list/teachers-develop-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: TeachersDevelopListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: TeachersDevelopItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeachersDevelopRouting{}
