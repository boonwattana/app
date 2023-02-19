import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveTimeItemComponent } from 'src/app/components/active-time/active-time-item/active-time-item.component';
import { ActiveTimeListComponent } from 'src/app/components/active-time/active-time-list/active-time-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ActiveTimeListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ActiveTimeItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActiveTimeRouting{}
