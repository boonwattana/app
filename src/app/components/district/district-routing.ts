import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictItemComponent } from 'src/app/components/district/district-item/district-item.component';
import { DistrictListComponent } from 'src/app/components/district/district-list/district-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: DistrictListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: DistrictItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DistrictRouting{}
