import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationBackgroundListComponent } from './education-background-list/education-background-list.component';
import { EducationBackgroundItemComponent } from './education-background-item/education-background-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { EducationBackgroundRouting } from './education-background-routing';
@NgModule({
  declarations: [
    EducationBackgroundListComponent,
    EducationBackgroundItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   EducationBackgroundRouting
  ],
  exports: [EducationBackgroundListComponent, EducationBackgroundItemComponent,EducationBackgroundRouting],
})
export class EducationBackgroundModule { }
