import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRequestItemComponent } from 'src/app/components/edit-request/edit-request-item/edit-request-item.component';
import { EditRequestListComponent } from 'src/app/components/edit-request/edit-request-list/edit-request-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: EditRequestListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: EditRequestItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditRequestRouting{}
