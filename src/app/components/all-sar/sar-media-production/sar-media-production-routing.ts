import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarMediaProductionItemComponent } from 'src/app/components/all-sar/sar-media-production/sar-media-production-item/sar-media-production-item.component';
import { SarMediaProductionListComponent } from 'src/app/components/all-sar/sar-media-production/sar-media-production-list/sar-media-production-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarMediaProductionListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarMediaProductionItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarMediaProductionRouting{}
