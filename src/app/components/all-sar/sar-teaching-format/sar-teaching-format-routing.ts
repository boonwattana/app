import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarTeachingFormatItemComponent } from 'src/app/components/all-sar/sar-teaching-format/sar-teaching-format-item/sar-teaching-format-item.component';
import { SarTeachingFormatListComponent } from 'src/app/components/all-sar/sar-teaching-format/sar-teaching-format-list/sar-teaching-format-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarTeachingFormatListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarTeachingFormatItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarTeachingFormatRouting{}
