import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRequestListComponent } from './edit-request-list/edit-request-list.component';
import { EditRequestItemComponent } from './edit-request-item/edit-request-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { EditRequestRouting } from './edit-request-routing';
@NgModule({
  declarations: [
    EditRequestListComponent,
    EditRequestItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   EditRequestRouting
  ],
  exports: [EditRequestListComponent, EditRequestItemComponent,EditRequestRouting],
})
export class EditRequestModule { }
