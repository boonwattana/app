import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarQualityEvidenceItemComponent } from 'src/app/components/all-sar/sar-quality-evidence3/sar-quality-evidence3-item/sar-quality-evidence3-item.component';
import { SarQualityEvidenceListComponent } from 'src/app/components/all-sar/sar-quality-evidence3/sar-quality-evidence3-list/sar-quality-evidence3-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarQualityEvidenceListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarQualityEvidenceItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarQualityEvidenceRouting{}
