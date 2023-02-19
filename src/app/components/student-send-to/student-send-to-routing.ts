import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { StudentSendToItemComponent } from './student-send-to-item/student-send-to-item.component';
import { StudentSendToListComponent } from './student-send-to-list/student-send-to-list.component';
const routes: Routes = [
   { path: '', component: StudentSendToListComponent ,canActivate:[AuthGuard]},
   { path: ':id', component: StudentSendToItemComponent ,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentSendToRouting{}
