import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReligionListComponent } from './religion-list/religion-list.component';
import { ReligionItemComponent } from './religion-item/religion-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ReligionRouting } from './religion-routing';
@NgModule({
  declarations: [
    ReligionListComponent,
    ReligionItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ReligionRouting
  ],
  exports: [ReligionListComponent, ReligionItemComponent,ReligionRouting],
})
export class ReligionModule { }
