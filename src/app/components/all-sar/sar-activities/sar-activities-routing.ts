import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarActivitiesItemComponent } from 'src/app/components/all-sar/sar-activities/sar-activities-item/sar-activities-item.component';
import { SarActivitiesListComponent } from 'src/app/components/all-sar/sar-activities/sar-activities-list/sar-activities-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarActivitiesListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarActivitiesItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarActivitiesRouting{}
