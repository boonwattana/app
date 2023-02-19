import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarPerformingSpecialDutiesItemComponent } from 'src/app/components/all-sar/sar-performing-special-duties/sar-performing-special-duties-item/sar-performing-special-duties-item.component';
import { SarPerformingSpecialDutiesListComponent } from 'src/app/components/all-sar/sar-performing-special-duties/sar-performing-special-duties-list/sar-performing-special-duties-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarPerformingSpecialDutiesListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarPerformingSpecialDutiesItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarPerformingSpecialDutiesRouting{}
