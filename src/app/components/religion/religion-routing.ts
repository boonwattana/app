import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReligionItemComponent } from 'src/app/components/religion/religion-item/religion-item.component';
import { ReligionListComponent } from 'src/app/components/religion/religion-list/religion-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: ReligionListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: ReligionItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReligionRouting{}
