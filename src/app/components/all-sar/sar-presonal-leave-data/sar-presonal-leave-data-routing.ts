import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarPresonalLeaveDataItemComponent } from 'src/app/components/all-sar/sar-presonal-leave-data/sar-presonal-leave-data-item/sar-presonal-leave-data-item.component';
import { SarPresonalLeaveDataListComponent } from 'src/app/components/all-sar/sar-presonal-leave-data/sar-presonal-leave-data-list/sar-presonal-leave-data-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarPresonalLeaveDataListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarPresonalLeaveDataItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarPresonalLeaveDataRouting{}
