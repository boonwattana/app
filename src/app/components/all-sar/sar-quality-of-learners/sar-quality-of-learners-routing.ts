import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarQualityOfLearnersItemComponent } from 'src/app/components/all-sar/sar-quality-of-learners/sar-quality-of-learners-item/sar-quality-of-learners-item.component';
import { SarQualityOfLearnersListComponent } from 'src/app/components/all-sar/sar-quality-of-learners/sar-quality-of-learners-list/sar-quality-of-learners-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarQualityOfLearnersListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarQualityOfLearnersItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarQualityOfLearnersRouting{}
