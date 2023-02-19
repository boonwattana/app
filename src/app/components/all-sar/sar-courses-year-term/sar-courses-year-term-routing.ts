import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarCoursesYearTermItemComponent } from 'src/app/components/all-sar/sar-courses-year-term/sar-courses-year-term-item/sar-courses-year-term-item.component';
import { SarCoursesYearTermListComponent } from 'src/app/components/all-sar/sar-courses-year-term/sar-courses-year-term-list/sar-courses-year-term-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarCoursesYearTermListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarCoursesYearTermItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarCoursesYearTermRouting{}
