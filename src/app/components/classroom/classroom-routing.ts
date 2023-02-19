import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomItemComponent } from 'src/app/components/classroom/classroom-item/classroom-item.component';
import { ClassroomListComponent } from 'src/app/components/classroom/classroom-list/classroom-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ClassroomListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ClassroomItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClassroomRouting{}
