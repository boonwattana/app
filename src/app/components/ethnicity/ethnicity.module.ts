import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EthnicityListComponent } from './ethnicity-list/ethnicity-list.component';
import { EthnicityItemComponent } from './ethnicity-item/ethnicity-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { EthnicityRouting } from './ethnicity-routing';
@NgModule({
  declarations: [
    EthnicityListComponent,
    EthnicityItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   EthnicityRouting
  ],
  exports: [EthnicityListComponent, EthnicityItemComponent,EthnicityRouting],
})
export class EthnicityModule { }
