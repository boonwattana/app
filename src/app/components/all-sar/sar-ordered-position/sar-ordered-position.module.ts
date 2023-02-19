import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarOrderedPositionListComponent } from './sar-ordered-position-list/sar-ordered-position-list.component';
import { SarOrderedPositionItemComponent } from './sar-ordered-position-item/sar-ordered-position-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarOrderedPositionRouting } from './sar-ordered-position-routing';
@NgModule({
  declarations: [
    SarOrderedPositionListComponent,
    SarOrderedPositionItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarOrderedPositionRouting
  ],
  exports: [SarOrderedPositionListComponent, SarOrderedPositionItemComponent,SarOrderedPositionRouting],
})
export class SarOrderedPositionModule { }
