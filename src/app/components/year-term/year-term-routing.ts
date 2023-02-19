import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearTermItemComponent } from 'src/app/components/year-term/year-term-item/year-term-item.component';
import { YearTermListComponent } from 'src/app/components/year-term/year-term-list/year-term-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: YearTermListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: YearTermItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YearTermRouting{}
