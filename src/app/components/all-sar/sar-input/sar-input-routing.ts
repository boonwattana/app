import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarInputItemComponent } from 'src/app/components/all-sar/sar-input/sar-input-item/sar-input-item.component';
import { SarInputListComponent } from 'src/app/components/all-sar/sar-input/sar-input-list/sar-input-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarInputListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarInputItemComponent ,canActivate:[AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarInputRouting{}
