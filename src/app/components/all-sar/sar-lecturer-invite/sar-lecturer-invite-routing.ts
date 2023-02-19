import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarLecturerInviteItemComponent } from 'src/app/components/all-sar/sar-lecturer-invite/sar-lecturer-invite-item/sar-lecturer-invite-item.component';
import { SarLecturerInviteListComponent } from 'src/app/components/all-sar/sar-lecturer-invite/sar-lecturer-invite-list/sar-lecturer-invite-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarLecturerInviteListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarLecturerInviteItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarLecturerInviteRouting{}
