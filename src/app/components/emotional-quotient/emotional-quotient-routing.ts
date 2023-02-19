import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmotionalQuotientItemComponent } from 'src/app/components/emotional-quotient/emotional-quotient-item/emotional-quotient-item.component';
import { EmotionalQuotientListComponent } from 'src/app/components/emotional-quotient/emotional-quotient-list/emotional-quotient-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: EmotionalQuotientListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: EmotionalQuotientItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmotionalQuotientRouting{}
