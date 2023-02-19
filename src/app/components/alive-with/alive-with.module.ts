import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliveWithListComponent } from './alive-with-list/alive-with-list.component';
import { AliveWithItemComponent } from './alive-with-item/alive-with-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { AliveWithRouting } from './alive-with-routing';
@NgModule({
  declarations: [
    AliveWithListComponent,
    AliveWithItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   AliveWithRouting
  ],
  exports: [AliveWithListComponent, AliveWithItemComponent,AliveWithRouting],
})
export class AliveWithModule { }
