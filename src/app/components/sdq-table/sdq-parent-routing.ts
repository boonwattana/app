import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdqParentItemComponent } from 'src/app/components/sdq-table/sdq-parent-item/sdq-parent-item.component';
import { SdqParentListComponent } from 'src/app/components/sdq-table/sdq-parent-list/sdq-parent-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SdqParentListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SdqParentItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SdqParentRouting{}
