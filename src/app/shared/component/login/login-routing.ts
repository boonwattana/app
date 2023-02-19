import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoListComponent } from 'src/app/shared/component/demo/demo-list/demo-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

   { path: '', component: LoginComponent ,canActivate:[AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginRouting{}
