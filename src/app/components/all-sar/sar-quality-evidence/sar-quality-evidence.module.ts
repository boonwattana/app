import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarQualityEvidenceListComponent } from './sar-quality-evidence-list/sar-quality-evidence-list.component';
import { SarQualityEvidenceItemComponent } from './sar-quality-evidence-item/sar-quality-evidence-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarQualityEvidenceRouting } from './sar-quality-evidence-routing';
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
