import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarCoursesYearTermListComponent } from './sar-courses-year-term-list/sar-courses-year-term-list.component';
import { SarCoursesYearTermItemComponent } from './sar-courses-year-term-item/sar-courses-year-term-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarCoursesYearTermRouting } from './sar-courses-year-term-routing';
@NgModule({
  declarations: [
    SarCoursesYearTermListComponent,
    SarCoursesYearTermItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarCoursesYearTermRouting
  ],
  exports: [SarCoursesYearTermListComponent, SarCoursesYearTermItemComponent,SarCoursesYearTermRouting],
})
export class SarCoursesYearTermModule { }
