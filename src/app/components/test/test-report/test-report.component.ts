import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student/student.service';
import { TestReportService } from '../test-report.service';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss']
})
export class TestReportComponent implements OnInit {

  constructor(private service:TestReportService) { }

  ngOnInit(): void {
    this.service.getItem(1).subscribe(
      res=>{
      }
    )
  }


}
