import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarMainMenuListComponent } from './sar-main-menu-list/sar-main-menu-list.component';
import { SarMainMenuItemComponent } from './sar-main-menu-item/sar-main-menu-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarMainMenuRouting } from './sar-main-menu-routing';
@NgModule({
  declarations: [
    SarMainMenuListComponent,
    SarMainMenuItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarMainMenuRouting
  ],
  exports: [SarMainMenuListComponent, SarMainMenuItemComponent,SarMainMenuRouting],
})
export class SarMainMenuModule { }
