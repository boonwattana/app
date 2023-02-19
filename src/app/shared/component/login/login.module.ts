import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRouting } from './login-routing';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedWidgetModule,
    LoginRouting
  ],
  exports:[LoginComponent,LoginRouting]
})
export class LoginModule { }
