import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentStatusListComponent } from './parent-status-list/parent-status-list.component';
import { ParentStatusItemComponent } from './parent-status-item/parent-status-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ParentStatusRouting } from './parent-status-routing';
@NgModule({
  declarations: [
    ParentStatusListComponent,
    ParentStatusItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ParentStatusRouting
  ],
  exports: [ParentStatusListComponent, ParentStatusItemComponent,ParentStatusRouting],
})
export class ParentStatusModule { }
