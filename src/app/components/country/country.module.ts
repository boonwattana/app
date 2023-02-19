import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryItemComponent } from './country-item/country-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { CountryRouting } from './country-routing';
@NgModule({
  declarations: [
    CountryListComponent,
    CountryItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   CountryRouting
  ],
  exports: [CountryListComponent, CountryItemComponent,CountryRouting],
})
export class CountryModule { }
