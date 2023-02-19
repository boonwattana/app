import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarTeachingConditionItemComponent } from 'src/app/components/all-sar/sar-teaching-condition/sar-teaching-condition-item/sar-teaching-condition-item.component';
import { SarTeachingConditionListComponent } from 'src/app/components/all-sar/sar-teaching-condition/sar-teaching-condition-list/sar-teaching-condition-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarTeachingConditionListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarTeachingConditionItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarTeachingConditionRouting{}
