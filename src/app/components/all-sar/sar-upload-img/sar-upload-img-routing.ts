import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SarUploadImgItemComponent } from 'src/app/components/all-sar/sar-upload-img/sar-upload-img-item/sar-upload-img-item.component';
import { SarUploadImgListComponent } from 'src/app/components/all-sar/sar-upload-img/sar-upload-img-list/sar-upload-img-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
const routes: Routes = [
   { path: '', component: SarUploadImgListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: SarUploadImgItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SarUploadImgRouting{}
