import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarTeachingScheduleItemComponent } from 'src/app/components/all-sar/sar-teaching-schedule/sar-teaching-schedule-item/sar-teaching-schedule-item.component';
import { SarTeachingScheduleListComponent } from 'src/app/components/all-sar/sar-teaching-schedule/sar-teaching-schedule-list/sar-teaching-schedule-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarTeachingScheduleListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarTeachingScheduleItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarTeachingScheduleRouting{}
