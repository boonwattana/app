import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerLevelItemComponent } from 'src/app/components/practitioner-level/practitioner-level-item/practitioner-level-item.component';
import { PractitionerLevelListComponent } from 'src/app/components/practitioner-level/practitioner-level-list/practitioner-level-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: PractitionerLevelListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: PractitionerLevelItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PractitionerLevelRouting{}
