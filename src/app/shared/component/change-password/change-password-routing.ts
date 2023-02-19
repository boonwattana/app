import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [

   { path: '', component: ChangePasswordComponent ,canActivate:[AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ChangePasswordRouting{}
