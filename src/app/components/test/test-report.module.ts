import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestReportComponent } from './test-report/test-report.component';
import { TestReportService } from './test-report.service';
import { TestReportRouting } from './test-routing';
import { SharedWidgetModule } from 'src/app/shared/widgets/shared-widget.module';



@NgModule({
  declarations: [
    TestReportComponent
  ],
  imports: [
    CommonModule,
    TestReportRouting,  SharedWidgetModule
    
  ]
  , exports:[
    TestReportComponent,TestReportRouting
  ]
})
export class TestReportModule { }
