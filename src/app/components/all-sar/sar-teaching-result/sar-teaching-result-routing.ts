import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarTeachingResultItemComponent } from 'src/app/components/all-sar/sar-teaching-result/sar-teaching-result-item/sar-teaching-result-item.component';
import { SarTeachingResultListComponent } from 'src/app/components/all-sar/sar-teaching-result/sar-teaching-result-list/sar-teaching-result-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarTeachingResultListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarTeachingResultItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarTeachingResultRouting{}
