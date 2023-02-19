import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SarUploadImgListComponent } from './sar-upload-img-list/sar-upload-img-list.component';
import { SarUploadImgItemComponent } from './sar-upload-img-item/sar-upload-img-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { SarUploadImgRouting } from './sar-upload-img-routing';
@NgModule({
  declarations: [
    SarUploadImgListComponent,
    SarUploadImgItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   SarUploadImgRouting
  ],
  exports: [SarUploadImgListComponent, SarUploadImgItemComponent,SarUploadImgRouting],
})
export class SarUploadImgModule { }
