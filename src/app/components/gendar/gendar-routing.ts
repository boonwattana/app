import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendarItemComponent } from 'src/app/components/gendar/gendar-item/gendar-item.component';
import { GendarListComponent } from 'src/app/components/gendar/gendar-list/gendar-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: GendarListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: GendarItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GendarRouting{}
