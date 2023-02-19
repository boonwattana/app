import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarQualityEvidenceListComponent } from './sar-quality-evidence3-list/sar-quality-evidence3-list.component';
import { SarQualityEvidenceItemComponent } from './sar-quality-evidence3-item/sar-quality-evidence3-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarQualityEvidenceRouting } from './sar-quality-evidence3-routing';
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
