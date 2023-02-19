import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarInputListComponent } from './sar-input-list/sar-input-list.component';
import { SarInputItemComponent } from './sar-input-item/sar-input-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarInputRouting } from './sar-input-routing';
@NgModule({
  declarations: [
    SarInputListComponent,
    SarInputItemComponent
    
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarInputRouting
  ],
  exports: [SarInputListComponent, SarInputItemComponent,SarInputRouting],
})
export class SarInputModule { }
