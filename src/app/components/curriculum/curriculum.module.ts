import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumListComponent } from './curriculum-list/curriculum-list.component';
import { CurriculumItemComponent } from './curriculum-item/curriculum-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { CurriculumRouting } from './curriculum-routing';
@NgModule({
  declarations: [
    CurriculumListComponent,
    CurriculumItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   CurriculumRouting
  ],
  exports: [CurriculumListComponent, CurriculumItemComponent,CurriculumRouting],
})
export class CurriculumModule { }
