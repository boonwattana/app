import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarTeachingFormatListComponent } from './sar-teaching-format-list/sar-teaching-format-list.component';
import { SarTeachingFormatItemComponent } from './sar-teaching-format-item/sar-teaching-format-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarTeachingFormatRouting } from './sar-teaching-format-routing';
@NgModule({
  declarations: [
    SarTeachingFormatListComponent,
    SarTeachingFormatItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarTeachingFormatRouting
  ],
  exports: [SarTeachingFormatListComponent, SarTeachingFormatItemComponent,SarTeachingFormatRouting],
})
export class SarTeachingFormatModule { }
