import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarTeachingConditionListComponent } from './sar-teaching-condition-list/sar-teaching-condition-list.component';
import { SarTeachingConditionItemComponent } from './sar-teaching-condition-item/sar-teaching-condition-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarTeachingConditionRouting } from './sar-teaching-condition-routing';
@NgModule({
  declarations: [
    SarTeachingConditionListComponent,
    SarTeachingConditionItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarTeachingConditionRouting
  ],
  exports: [SarTeachingConditionListComponent, SarTeachingConditionItemComponent,SarTeachingConditionRouting],
})
export class SarTeachingConditionModule { }
