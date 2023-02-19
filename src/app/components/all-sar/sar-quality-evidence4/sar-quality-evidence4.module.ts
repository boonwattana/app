import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarQualityEvidenceListComponent } from './sar-quality-evidence4-list/sar-quality-evidence4-list.component';
import { SarQualityEvidenceItemComponent } from './sar-quality-evidence4-item/sar-quality-evidence4-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarQualityEvidenceRouting } from './sar-quality-evidence4-routing';
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
