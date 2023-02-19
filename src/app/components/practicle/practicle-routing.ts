import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticleItemComponent } from 'src/app/components/practicle/practicle-item/practicle-item.component';
import { PracticleListComponent } from 'src/app/components/practicle/practicle-list/practicle-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: PracticleListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: PracticleItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PracticleRouting{}
