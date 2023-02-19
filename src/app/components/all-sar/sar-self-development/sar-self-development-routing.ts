import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarSelfDevelopmentItemComponent } from 'src/app/components/all-sar/sar-self-development/sar-self-development-item/sar-self-development-item.component';
import { SarSelfDevelopmentListComponent } from 'src/app/components/all-sar/sar-self-development/sar-self-development-list/sar-self-development-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarSelfDevelopmentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarSelfDevelopmentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarSelfDevelopmentRouting{}
