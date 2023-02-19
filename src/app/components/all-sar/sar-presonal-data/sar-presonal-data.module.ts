import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarPresonalDataListComponent } from './sar-presonal-data-list/sar-presonal-data-list.component';
import { SarPresonalDataItemComponent } from './sar-presonal-data-item/sar-presonal-data-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarPresonalDataRouting } from './sar-presonal-data-routing';
@NgModule({
  declarations: [
    SarPresonalDataListComponent,
    SarPresonalDataItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarPresonalDataRouting
  ],
  exports: [SarPresonalDataListComponent, SarPresonalDataItemComponent,SarPresonalDataRouting],
})
export class SarPresonalDataModule { }
