import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StressListModel } from '../stress-model';
import { StressService } from '../stress.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'stress-list',
  templateUrl: './stress-list.component.html',
  styleUrls: ['./stress-list.component.scss']
})
export class StressListComponent extends BaseListComponent<StressListModel> implements BaseListInterface {
  tableName:string ='stress'
  moduleName:string = 'MODULE.STRESS'
  lastRemoveId:number = undefined;
  classroomOption:SelectItems[] = []
  classroomTypeOption:SelectItems[] = []
  
  constructor(private service: StressService,
     router:Router,route:ActivatedRoute,
     private readonly reportService:ReportService,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.reportName = 'STRESS'
  }
  setSerachCondtion(): void {
    let roomId = undefined
    let hiddent = false
    let classId = undefined
    if(this.userDataService.isTeacher()){
      hiddent = true
      roomId = this.userDataService.getClassroomId()
      classId = this.userDataService.getClassroomTypeId()
    }
    if(this.userDataService.isGuid()){
      hiddent = false
    }

    const searchConditions:SearchCondition[] = [
      {
          tableName:'stress',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'stress',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        hidden:hiddent,
        enumOption:this.classroomTypeOption,
        value:classId
    },
    {
      tableName:'stress',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      hidden:hiddent,
      enumOption:this.classroomOption,
      value:roomId
    }
    ]
    this.searchConditions = searchConditions;
  }
  ngOnInit(): void {
    this.onEnumLoader()
    this.setSerachCondtion()
    this.setDataGridOption()

  }

  onSearch(searchParameter: SearchParameter): void {        
    this.service.getList(searchParameter).subscribe(result=>{      
      this.searchResult = result
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {
    forkJoin(
      this.service.getClassroomTypeDropdown(),
      this.service.getClassroomDropdown(),

      ).subscribe(
        ([
        classroomTypeOption,
        classroomOption,

        ]) => {
        [
       this.classroomTypeOption =classroomTypeOption  as SelectItems[],
       this.classroomOption =classroomOption  as SelectItems[],
       this.setSerachCondtion()
        ]
        }),
        (error) => {
        }
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },   
      {
        label: 'LABEL.STUDENT_VALUE',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },   
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'typeName',
        type: ColumnType.STRING,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'room',
        type: ColumnType.STRING,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STRESS_OPTION_1',
        textKey: 'sumValue',
        type: ColumnType.STRESS,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.FORM_DATE',
        textKey: 'updatedAt',
        type: ColumnType.DATE,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STATUS',
        textKey: 'updatedAt',
        type: ColumnType.ACTION,
        tableName: 'stress',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
    ];
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPage(0,false)
  }
  onView(row: RowIdentity): void {
    this.toItemPage(row.id,true)
  }
  onEdit(row: RowIdentity):void{
    this.toItemPage(row.id,false)
  }
  onDelete(row: RowIdentity): void {
    this.service.delete(row.id).subscribe(result=>{
      this.lastRemoveId = result.id
    })
  }
  toItemPage(id:number,isView:boolean){
    this.toItem('stress',id,isView)
  }
}
