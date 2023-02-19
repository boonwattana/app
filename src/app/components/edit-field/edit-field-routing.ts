import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFieldItemComponent } from 'src/app/components/edit-field/edit-field-item/edit-field-item.component';
import { EditFieldListComponent } from 'src/app/components/edit-field/edit-field-list/edit-field-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: EditFieldListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: EditFieldItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditFieldRouting{}
