import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticleListComponent } from './practicle-list/practicle-list.component';
import { PracticleItemComponent } from './practicle-item/practicle-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { PracticleRouting } from './practicle-routing';
@NgModule({
  declarations: [
    PracticleListComponent,
    PracticleItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   PracticleRouting
  ],
  exports: [PracticleListComponent, PracticleItemComponent,PracticleRouting],
})
export class PracticleModule { }
