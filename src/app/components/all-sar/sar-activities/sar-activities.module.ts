import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarActivitiesListComponent } from './sar-activities-list/sar-activities-list.component';
import { SarActivitiesItemComponent } from './sar-activities-item/sar-activities-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarActivitiesRouting } from './sar-activities-routing';
@NgModule({
  declarations: [
    SarActivitiesListComponent,
    SarActivitiesItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarActivitiesRouting
  ],
  exports: [SarActivitiesListComponent, SarActivitiesItemComponent,SarActivitiesRouting],
})
export class SarActivitiesModule { }
