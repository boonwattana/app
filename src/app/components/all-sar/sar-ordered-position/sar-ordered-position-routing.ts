import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarOrderedPositionItemComponent } from 'src/app/components/all-sar/sar-ordered-position/sar-ordered-position-item/sar-ordered-position-item.component';
import { SarOrderedPositionListComponent } from 'src/app/components/all-sar/sar-ordered-position/sar-ordered-position-list/sar-ordered-position-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarOrderedPositionListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarOrderedPositionItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarOrderedPositionRouting{}
