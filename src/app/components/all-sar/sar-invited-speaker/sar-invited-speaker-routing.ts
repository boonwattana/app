import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarInvitedSpeakerItemComponent } from 'src/app/components/all-sar/sar-invited-speaker/sar-invited-speaker-item/sar-invited-speaker-item.component';
import { SarInvitedSpeakerListComponent } from 'src/app/components/all-sar/sar-invited-speaker/sar-invited-speaker-list/sar-invited-speaker-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarInvitedSpeakerListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarInvitedSpeakerItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarInvitedSpeakerRouting{}
