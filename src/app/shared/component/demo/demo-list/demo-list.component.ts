import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { DemoListModel } from '../demo-model';
// import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { DemoService } from '../demo.service';
@Component({
  selector: 'demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent extends BaseListComponent<DemoListModel>{
  tableName:string ='demo'
  moduleName:string = 'MODULE.DEMO'
  lastRemoveId:number = undefined;
  demoEnumOption:SelectItems[] = []
  gendarOption:SelectItems[] = []
  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
   radarChartLabels: string[] = [ 'ปีการศึกษา 2561', 'ปีการศึกษา 2562', 'ปีการศึกษา 2563', 'ปีการศึกษา 2564', 'ปีการศึกษา 2565' ];

   radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [ 0, 0, 0,0,0],  label: 'สถิติจำนวนบุคลากร 5 ปีย้อนหลัง'},
    ]
  };
  radarChartData2: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [ 0, 0, 0,0,0],  label: 'สถิติจำนวนบุคลากร 5 ปีย้อนหลัง'},
    ]
  };
  
   radarChartType: ChartType = 'pie';
   radarChartType1: ChartType = 'line';

  // events
   chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }

   chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }
  model:{
    studentByClass:{name:string,count:number}[]
    studentByGendar:{name:string,count:number}[]
    teacherByGendar:{name:string,count:number}[]
    studentCount:number
    teacherCount:number
    dataDate:string
  }
  constructor(private service: DemoService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }

  

  ngOnInit(): void {
    this.service.getDashboard().subscribe(result=>{
      this.model = result
      this.radarChartData = {
        labels: this.radarChartLabels,
        datasets: [
          { data: [ 0, 0, 0,0,this.model.studentCount],  label: 'สถิติจำนวนบุคลากร 5 ปีย้อนหลัง'},
        ]
      };
      this.radarChartData2= {
        labels: this.radarChartLabels,
        datasets: [
          { data: [ 0, 0, 0,0,this.model.teacherCount],  label: 'สถิติจำนวนบุคลากร 5 ปีย้อนหลัง'},
        ]
      };
    })
    

  }

  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {

  }

}
