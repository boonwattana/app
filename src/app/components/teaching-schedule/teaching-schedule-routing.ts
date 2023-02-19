import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachingScheduleItemComponent } from 'src/app/components/teaching-schedule/teaching-schedule-item/teaching-schedule-item.component';
import { TeachingScheduleListComponent } from 'src/app/components/teaching-schedule/teaching-schedule-list/teaching-schedule-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: TeachingScheduleListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: TeachingScheduleItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeachingScheduleRouting{}
