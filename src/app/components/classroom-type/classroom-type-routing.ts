import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomTypeItemComponent } from 'src/app/components/classroom-type/classroom-type-item/classroom-type-item.component';
import { ClassroomTypeListComponent } from 'src/app/components/classroom-type/classroom-type-list/classroom-type-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ClassroomTypeListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ClassroomTypeItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClassroomTypeRouting{}
