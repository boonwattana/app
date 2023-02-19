import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarInvitedSpeakerListComponent } from './sar-invited-speaker-list/sar-invited-speaker-list.component';
import { SarInvitedSpeakerItemComponent } from './sar-invited-speaker-item/sar-invited-speaker-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarInvitedSpeakerRouting } from './sar-invited-speaker-routing';
@NgModule({
  declarations: [
    SarInvitedSpeakerListComponent,
    SarInvitedSpeakerItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarInvitedSpeakerRouting
  ],
  exports: [SarInvitedSpeakerListComponent, SarInvitedSpeakerItemComponent,SarInvitedSpeakerRouting],
})
export class SarInvitedSpeakerModule { }
