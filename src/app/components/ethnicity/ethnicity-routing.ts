import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthnicityItemComponent } from 'src/app/components/ethnicity/ethnicity-item/ethnicity-item.component';
import { EthnicityListComponent } from 'src/app/components/ethnicity/ethnicity-list/ethnicity-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: EthnicityListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: EthnicityItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EthnicityRouting{}
