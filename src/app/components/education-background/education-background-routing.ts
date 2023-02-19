import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationBackgroundItemComponent } from 'src/app/components/education-background/education-background-item/education-background-item.component';
import { EducationBackgroundListComponent } from 'src/app/components/education-background/education-background-list/education-background-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: EducationBackgroundListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: EducationBackgroundItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EducationBackgroundRouting{}
