import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarQualityEvidenceListComponent } from './sar-quality-evidence2-list/sar-quality-evidence2-list.component';
import { SarQualityEvidenceItemComponent } from './sar-quality-evidence2-item/sar-quality-evidence2-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarQualityEvidenceRouting } from './sar-quality-evidence2-routing';
@NgModule({
  declarations: [
    SarQualityEvidenceListComponent,
    SarQualityEvidenceItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarQualityEvidenceRouting
  ],
  exports: [SarQualityEvidenceListComponent, SarQualityEvidenceItemComponent,SarQualityEvidenceRouting],
})
export class SarQualityEvidenceModule { }
