import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarAdviseClassListComponent } from './sar-advise-class-list/sar-advise-class-list.component';
import { SarAdviseClassItemComponent } from './sar-advise-class-item/sar-advise-class-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarAdviseClassRouting } from './sar-advise-class-routing';
@NgModule({
  declarations: [
    SarAdviseClassListComponent,
    SarAdviseClassItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarAdviseClassRouting
  ],
  exports: [SarAdviseClassListComponent, SarAdviseClassItemComponent,SarAdviseClassRouting],
})
export class SarAdviseClassModule { }
