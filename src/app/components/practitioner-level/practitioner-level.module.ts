import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PractitionerLevelListComponent } from './practitioner-level-list/practitioner-level-list.component';
import { PractitionerLevelItemComponent } from './practitioner-level-item/practitioner-level-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { PractitionerLevelRouting } from './practitioner-level-routing';
@NgModule({
  declarations: [
    PractitionerLevelListComponent,
    PractitionerLevelItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   PractitionerLevelRouting
  ],
  exports: [PractitionerLevelListComponent, PractitionerLevelItemComponent,PractitionerLevelRouting],
})
export class PractitionerLevelModule { }
