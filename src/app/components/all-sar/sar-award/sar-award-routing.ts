import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarAwardItemComponent } from 'src/app/components/all-sar/sar-award/sar-award-item/sar-award-item.component';
import { SarAwardListComponent } from 'src/app/components/all-sar/sar-award/sar-award-list/sar-award-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarAwardListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarAwardItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarAwardRouting{}
