import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarAnotherSpeacialDutyListComponent } from './sar-another-speacial-duty-list/sar-another-speacial-duty-list.component';
import { SarAnotherSpeacialDutyItemComponent } from './sar-another-speacial-duty-item/sar-another-speacial-duty-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarAnotherSpeacialDutyRouting } from './sar-another-speacial-duty-routing';
@NgModule({
  declarations: [
    SarAnotherSpeacialDutyListComponent,
    SarAnotherSpeacialDutyItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarAnotherSpeacialDutyRouting
  ],
  exports: [SarAnotherSpeacialDutyListComponent, SarAnotherSpeacialDutyItemComponent,SarAnotherSpeacialDutyRouting],
})
export class SarAnotherSpeacialDutyModule { }
