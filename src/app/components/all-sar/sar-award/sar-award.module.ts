import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarAwardListComponent } from './sar-award-list/sar-award-list.component';
import { SarAwardItemComponent } from './sar-award-item/sar-award-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarAwardRouting } from './sar-award-routing';
@NgModule({
  declarations: [
    SarAwardListComponent,
    SarAwardItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarAwardRouting
  ],
  exports: [SarAwardListComponent, SarAwardItemComponent,SarAwardRouting],
})
export class SarAwardModule { }
