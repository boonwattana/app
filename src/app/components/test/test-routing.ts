import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/services/auth.guard";
import { TestReportComponent } from "./test-report/test-report.component";

const routes: Routes = [
    { path: '', component: TestReportComponent ,canActivate:[AuthGuard]},
    // { path: ':id', component: TeachersDevelopItemComponent ,canActivate:[AuthGuard]}
 ];
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
 })
 export class TestReportRouting{}
 