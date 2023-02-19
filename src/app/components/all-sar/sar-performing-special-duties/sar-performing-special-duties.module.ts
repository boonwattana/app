import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarPerformingSpecialDutiesListComponent } from './sar-performing-special-duties-list/sar-performing-special-duties-list.component';
import { SarPerformingSpecialDutiesItemComponent } from './sar-performing-special-duties-item/sar-performing-special-duties-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarPerformingSpecialDutiesRouting } from './sar-performing-special-duties-routing';
@NgModule({
  declarations: [
    SarPerformingSpecialDutiesListComponent,
    SarPerformingSpecialDutiesItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarPerformingSpecialDutiesRouting
  ],
  exports: [SarPerformingSpecialDutiesListComponent, SarPerformingSpecialDutiesItemComponent,SarPerformingSpecialDutiesRouting],
})
export class SarPerformingSpecialDutiesModule { }
