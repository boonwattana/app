import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFieldListComponent } from './edit-field-list/edit-field-list.component';
import { EditFieldItemComponent } from './edit-field-item/edit-field-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { EditFieldRouting } from './edit-field-routing';
@NgModule({
  declarations: [
    EditFieldListComponent,
    EditFieldItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   EditFieldRouting
  ],
  exports: [EditFieldListComponent, EditFieldItemComponent,EditFieldRouting],
})
export class EditFieldModule { }
