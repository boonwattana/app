import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarResearchInClassItemComponent } from 'src/app/components/all-sar/sar-research-in-class/sar-research-in-class-item/sar-research-in-class-item.component';
import { SarResearchInClassListComponent } from 'src/app/components/all-sar/sar-research-in-class/sar-research-in-class-list/sar-research-in-class-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarResearchInClassListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarResearchInClassItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarResearchInClassRouting{}
