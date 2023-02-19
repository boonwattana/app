import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarStandard2ItemComponent } from 'src/app/components/all-sar/sar-standard2/sar-standard2-item/sar-standard2-item.component';
import { SarStandard2ListComponent } from 'src/app/components/all-sar/sar-standard2/sar-standard2-list/sar-standard2-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarStandard2ListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarStandard2ItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarStandard2Routing{}
