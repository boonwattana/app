import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDistrictListComponent } from './sub-district-list/sub-district-list.component';
import { SubDistrictItemComponent } from './sub-district-item/sub-district-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SubDistrictRouting } from './sub-district-routing';
@NgModule({
  declarations: [
    SubDistrictListComponent,
    SubDistrictItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SubDistrictRouting
  ],
  exports: [SubDistrictListComponent, SubDistrictItemComponent,SubDistrictRouting],
})
export class SubDistrictModule { }
