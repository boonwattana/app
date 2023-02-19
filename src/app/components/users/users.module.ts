import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersItemComponent } from './users-item/users-item.component';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';
import { UsersRouting } from './users-routing';
@NgModule({
  declarations: [
    UsersListComponent,
    UsersItemComponent
  ],
  imports: [
    CommonModule,
   SharedWidgetModule,
   UsersRouting
  ],
  exports: [UsersListComponent, UsersItemComponent,UsersRouting],
})
export class UsersModule { }
