import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarMainMenuItemComponent } from 'src/app/components/all-sar/sar-main-menu/sar-main-menu-item/sar-main-menu-item.component';
import { SarMainMenuListComponent } from 'src/app/components/all-sar/sar-main-menu/sar-main-menu-list/sar-main-menu-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [

   { path: '', component: SarMainMenuItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarMainMenuRouting{}
