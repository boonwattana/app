import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryItemComponent } from 'src/app/components/country/country-item/country-item.component';
import { CountryListComponent } from 'src/app/components/country/country-list/country-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: CountryListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: CountryItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountryRouting{}
