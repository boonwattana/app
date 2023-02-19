import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarAdviseClassItemComponent } from 'src/app/components/all-sar/sar-advise-class/sar-advise-class-item/sar-advise-class-item.component';
import { SarAdviseClassListComponent } from 'src/app/components/all-sar/sar-advise-class/sar-advise-class-list/sar-advise-class-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarAdviseClassListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarAdviseClassItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarAdviseClassRouting{}
