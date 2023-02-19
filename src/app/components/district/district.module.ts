import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictItemComponent } from './district-item/district-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { DistrictRouting } from './district-routing';
@NgModule({
  declarations: [
    DistrictListComponent,
    DistrictItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   DistrictRouting
  ],
  exports: [DistrictListComponent, DistrictItemComponent,DistrictRouting],
})
export class DistrictModule { }
