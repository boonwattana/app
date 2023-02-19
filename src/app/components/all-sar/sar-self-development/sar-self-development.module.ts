import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarSelfDevelopmentListComponent } from './sar-self-development-list/sar-self-development-list.component';
import { SarSelfDevelopmentItemComponent } from './sar-self-development-item/sar-self-development-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarSelfDevelopmentRouting } from './sar-self-development-routing';
@NgModule({
  declarations: [
    SarSelfDevelopmentListComponent,
    SarSelfDevelopmentItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarSelfDevelopmentRouting
  ],
  exports: [SarSelfDevelopmentListComponent, SarSelfDevelopmentItemComponent,SarSelfDevelopmentRouting],
})
export class SarSelfDevelopmentModule { }
