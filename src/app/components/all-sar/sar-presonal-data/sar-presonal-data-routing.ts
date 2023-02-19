import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarPresonalDataItemComponent } from 'src/app/components/all-sar/sar-presonal-data/sar-presonal-data-item/sar-presonal-data-item.component';
import { SarPresonalDataListComponent } from 'src/app/components/all-sar/sar-presonal-data/sar-presonal-data-list/sar-presonal-data-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarPresonalDataListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarPresonalDataItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarPresonalDataRouting{}
