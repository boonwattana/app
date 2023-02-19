import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionalQuotientListComponent } from './emotional-quotient-list/emotional-quotient-list.component';
import { EmotionalQuotientItemComponent } from './emotional-quotient-item/emotional-quotient-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { EmotionalQuotientRouting } from './emotional-quotient-routing';
@NgModule({
  declarations: [
    EmotionalQuotientListComponent,
    EmotionalQuotientItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   EmotionalQuotientRouting
  ],
  exports: [EmotionalQuotientListComponent, EmotionalQuotientItemComponent,EmotionalQuotientRouting],
})
export class EmotionalQuotientModule { }
