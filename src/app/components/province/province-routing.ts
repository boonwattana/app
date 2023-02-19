import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceItemComponent } from 'src/app/components/province/province-item/province-item.component';
import { ProvinceListComponent } from 'src/app/components/province/province-list/province-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ProvinceListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ProvinceItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProvinceRouting{}
