import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarResearchInClassListComponent } from './sar-research-in-class-list/sar-research-in-class-list.component';
import { SarResearchInClassItemComponent } from './sar-research-in-class-item/sar-research-in-class-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarResearchInClassRouting } from './sar-research-in-class-routing';
@NgModule({
  declarations: [
    SarResearchInClassListComponent,
    SarResearchInClassItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarResearchInClassRouting
  ],
  exports: [SarResearchInClassListComponent, SarResearchInClassItemComponent,SarResearchInClassRouting],
})
export class SarResearchInClassModule { }
