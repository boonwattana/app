import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubDistrictItemComponent } from 'src/app/components/sub-district/sub-district-item/sub-district-item.component';
import { SubDistrictListComponent } from 'src/app/components/sub-district/sub-district-list/sub-district-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SubDistrictListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SubDistrictItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubDistrictRouting{}
