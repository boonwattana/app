import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GendarListComponent } from './gendar-list/gendar-list.component';
import { GendarItemComponent } from './gendar-item/gendar-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { GendarRouting } from './gendar-routing';
@NgModule({
  declarations: [
    GendarListComponent,
    GendarItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   GendarRouting
  ],
  exports: [GendarListComponent, GendarItemComponent,GendarRouting],
})
export class GendarModule { }
