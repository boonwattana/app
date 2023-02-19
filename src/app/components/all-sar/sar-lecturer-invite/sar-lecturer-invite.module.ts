import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarLecturerInviteListComponent } from './sar-lecturer-invite-list/sar-lecturer-invite-list.component';
import { SarLecturerInviteItemComponent } from './sar-lecturer-invite-item/sar-lecturer-invite-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarLecturerInviteRouting } from './sar-lecturer-invite-routing';
@NgModule({
  declarations: [
    SarLecturerInviteListComponent,
    SarLecturerInviteItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarLecturerInviteRouting
  ],
  exports: [SarLecturerInviteListComponent, SarLecturerInviteItemComponent,SarLecturerInviteRouting],
})
export class SarLecturerInviteModule { }
