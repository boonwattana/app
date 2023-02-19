import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepressionListComponent } from './depression-list/depression-list.component';
import { DepressionItemComponent } from './depression-item/depression-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { DepressionRouting } from './depression-routing';
@NgModule({
  declarations: [
    DepressionListComponent,
    DepressionItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   DepressionRouting
  ],
  exports: [DepressionListComponent, DepressionItemComponent,DepressionRouting],
})
export class DepressionModule { }
