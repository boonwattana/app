import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationalityListComponent } from './nationality-list/nationality-list.component';
import { NationalityItemComponent } from './nationality-item/nationality-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { NationalityRouting } from './nationality-routing';
@NgModule({
  declarations: [
    NationalityListComponent,
    NationalityItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   NationalityRouting
  ],
  exports: [NationalityListComponent, NationalityItemComponent,NationalityRouting],
})
export class NationalityModule { }
