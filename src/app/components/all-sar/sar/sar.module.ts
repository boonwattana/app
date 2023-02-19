import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarListComponent } from './sar-list/sar-list.component';
import { SarItemComponent } from './sar-item/sar-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarRouting } from './sar-routing';
@NgModule({
  declarations: [
    SarListComponent,
    SarItemComponent
    
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarRouting
  ],
  exports: [SarListComponent, SarItemComponent,SarRouting],
})
export class SarModule { }
