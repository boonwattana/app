import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarStandard4ItemComponent } from 'src/app/components/all-sar/sar-standard4/sar-standard4-item/sar-standard4-item.component';
import { SarStandard4ListComponent } from 'src/app/components/all-sar/sar-standard4/sar-standard4-list/sar-standard4-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarStandard4ListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarStandard4ItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarStandard4Routing{}
