import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent, } from './change-password/change-password.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { ChangePasswordRouting } from './change-password-routing';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedWidgetModule,
    ChangePasswordRouting
  ],
  exports:[ChangePasswordComponent,ChangePasswordRouting]
})
export class ChangePasswordModule { }
