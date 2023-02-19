import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearTermListComponent } from './year-term-list/year-term-list.component';
import { YearTermItemComponent } from './year-term-item/year-term-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { YearTermRouting } from './year-term-routing';
@NgModule({
  declarations: [
    YearTermListComponent,
    YearTermItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   YearTermRouting
  ],
  exports: [YearTermListComponent, YearTermItemComponent,YearTermRouting],
})
export class YearTermModule { }
