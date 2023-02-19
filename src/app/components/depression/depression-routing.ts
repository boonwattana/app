import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepressionItemComponent } from 'src/app/components/depression/depression-item/depression-item.component';
import { DepressionListComponent } from 'src/app/components/depression/depression-list/depression-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: DepressionListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: DepressionItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DepressionRouting{}
