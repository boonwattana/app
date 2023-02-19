import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersItemComponent } from 'src/app/components/users/users-item/users-item.component';
import { UsersListComponent } from 'src/app/components/users/users-list/users-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: UsersListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: UsersItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersRouting{}
