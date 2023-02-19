import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NationalityItemComponent } from 'src/app/components/nationality/nationality-item/nationality-item.component';
import { NationalityListComponent } from 'src/app/components/nationality/nationality-list/nationality-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: NationalityListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: NationalityItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NationalityRouting{}
