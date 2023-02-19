import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarIntegratedLearningListComponent } from './sar-integrated-learning-list/sar-integrated-learning-list.component';
import { SarIntegratedLearningItemComponent } from './sar-integrated-learning-item/sar-integrated-learning-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarIntegratedLearningRouting } from './sar-integrated-learning-routing';
@NgModule({
  declarations: [
    SarIntegratedLearningListComponent,
    SarIntegratedLearningItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarIntegratedLearningRouting
  ],
  exports: [SarIntegratedLearningListComponent, SarIntegratedLearningItemComponent,SarIntegratedLearningRouting],
})
export class SarIntegratedLearningModule { }
