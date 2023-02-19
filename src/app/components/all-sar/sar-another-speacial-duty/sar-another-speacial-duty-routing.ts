import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarAnotherSpeacialDutyItemComponent } from 'src/app/components/all-sar/sar-another-speacial-duty/sar-another-speacial-duty-item/sar-another-speacial-duty-item.component';
import { SarAnotherSpeacialDutyListComponent } from 'src/app/components/all-sar/sar-another-speacial-duty/sar-another-speacial-duty-list/sar-another-speacial-duty-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarAnotherSpeacialDutyListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarAnotherSpeacialDutyItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarAnotherSpeacialDutyRouting{}
