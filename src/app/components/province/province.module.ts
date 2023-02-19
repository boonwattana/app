import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinceListComponent } from './province-list/province-list.component';
import { ProvinceItemComponent } from './province-item/province-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ProvinceRouting } from './province-routing';
@NgModule({
  declarations: [
    ProvinceListComponent,
    ProvinceItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   ProvinceRouting
  ],
  exports: [ProvinceListComponent, ProvinceItemComponent,ProvinceRouting],
})
export class ProvinceModule { }
