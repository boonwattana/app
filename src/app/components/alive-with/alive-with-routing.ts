import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AliveWithItemComponent } from 'src/app/components/alive-with/alive-with-item/alive-with-item.component';
import { AliveWithListComponent } from 'src/app/components/alive-with/alive-with-list/alive-with-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: AliveWithListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: AliveWithItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AliveWithRouting{}
