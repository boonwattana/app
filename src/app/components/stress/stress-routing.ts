import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StressItemComponent } from 'src/app/components/stress/stress-item/stress-item.component';
import { StressListComponent } from 'src/app/components/stress/stress-list/stress-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: StressListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StressItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StressRouting{}
