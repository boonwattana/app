import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdqParentListComponent } from './sdq-parent-list/sdq-parent-list.component';
import { SdqParentItemComponent } from './sdq-parent-item/sdq-parent-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SdqParentRouting } from './sdq-parent-routing';
@NgModule({
  declarations: [
    SdqParentItemComponent,
    SdqParentListComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SdqParentRouting
  ],
  exports: [SdqParentRouting,SdqParentItemComponent,SdqParentListComponent],
})
export class SdqParentModule { }
