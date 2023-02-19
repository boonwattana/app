import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTimeListComponent } from './active-time-list/active-time-list.component';
import { ActiveTimeItemComponent } from './active-time-item/active-time-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ActiveTimeRouting } from './active-time-routing';
@NgModule({
  declarations: [
    ActiveTimeListComponent,
    ActiveTimeItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ActiveTimeRouting
  ],
  exports: [ActiveTimeListComponent, ActiveTimeItemComponent,ActiveTimeRouting],
})
export class ActiveTimeModule { }
