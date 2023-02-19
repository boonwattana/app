import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumItemComponent } from 'src/app/components/curriculum/curriculum-item/curriculum-item.component';
import { CurriculumListComponent } from 'src/app/components/curriculum/curriculum-list/curriculum-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: CurriculumListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: CurriculumItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CurriculumRouting{}
