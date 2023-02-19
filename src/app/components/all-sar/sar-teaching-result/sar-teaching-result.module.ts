import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarTeachingResultListComponent } from './sar-teaching-result-list/sar-teaching-result-list.component';
import { SarTeachingResultItemComponent } from './sar-teaching-result-item/sar-teaching-result-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarTeachingResultRouting } from './sar-teaching-result-routing';
@NgModule({
  declarations: [
    SarTeachingResultListComponent,
    SarTeachingResultItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarTeachingResultRouting
  ],
  exports: [SarTeachingResultListComponent, SarTeachingResultItemComponent,SarTeachingResultRouting],
})
export class SarTeachingResultModule { }
