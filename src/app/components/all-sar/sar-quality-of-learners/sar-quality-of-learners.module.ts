import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarQualityOfLearnersListComponent } from './sar-quality-of-learners-list/sar-quality-of-learners-list.component';
import { SarQualityOfLearnersItemComponent } from './sar-quality-of-learners-item/sar-quality-of-learners-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarQualityOfLearnersRouting } from './sar-quality-of-learners-routing';
@NgModule({
  declarations: [
    SarQualityOfLearnersListComponent,
    SarQualityOfLearnersItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarQualityOfLearnersRouting
  ],
  exports: [SarQualityOfLearnersListComponent, SarQualityOfLearnersItemComponent,SarQualityOfLearnersRouting],
})
export class SarQualityOfLearnersModule { }
