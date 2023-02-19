import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentStatusItemComponent } from 'src/app/components/parent-status/parent-status-item/parent-status-item.component';
import { ParentStatusListComponent } from 'src/app/components/parent-status/parent-status-list/parent-status-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ParentStatusListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ParentStatusItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParentStatusRouting{}
