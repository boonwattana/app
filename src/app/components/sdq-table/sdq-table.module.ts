import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdqTableListComponent } from './sdq-table-list/sdq-table-list.component';
import { SdqTableItemComponent } from './sdq-table-item/sdq-table-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SdqTableRouting } from './sdq-table-routing';
@NgModule({
  declarations: [
    SdqTableListComponent,
    SdqTableItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SdqTableRouting
  ],
  exports: [SdqTableListComponent, SdqTableItemComponent,SdqTableRouting],
})
export class SdqTableModule { }
