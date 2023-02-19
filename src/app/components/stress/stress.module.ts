import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StressListComponent } from './stress-list/stress-list.component';
import { StressItemComponent } from './stress-item/stress-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { StressRouting } from './stress-routing';
@NgModule({
  declarations: [
    StressListComponent,
    StressItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   StressRouting
  ],
  exports: [StressListComponent, StressItemComponent,StressRouting],
})
export class StressModule { }
