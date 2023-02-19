import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarStandard3ItemComponent } from 'src/app/components/all-sar/sar-standard3/sar-standard3-item/sar-standard3-item.component';
import { SarStandard3ListComponent } from 'src/app/components/all-sar/sar-standard3/sar-standard3-list/sar-standard3-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarStandard3ListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarStandard3ItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarStandard3Routing{}
