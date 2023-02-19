import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoListComponent } from './demo-list/demo-list.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { NgChartsModule } from 'ng2-charts';
import { DemoRouting } from './demo-routing';
@NgModule({
  declarations: [
    DemoListComponent,
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   DemoRouting,
   NgChartsModule
  ],
  exports: [DemoListComponent,DemoRouting],
})
export class DemoModule { }
