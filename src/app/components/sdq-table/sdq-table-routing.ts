import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdqTableItemComponent } from 'src/app/components/sdq-table/sdq-table-item/sdq-table-item.component';
import { SdqTableListComponent } from 'src/app/components/sdq-table/sdq-table-list/sdq-table-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SdqTableListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SdqTableItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SdqTableRouting{}
