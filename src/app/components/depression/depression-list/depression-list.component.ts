import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { DepressionListModel } from '../depression-model';
import { DepressionService } from '../depression.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'depression-list',
  templateUrl: './depression-list.component.html',
  styleUrls: ['./depression-list.component.scss']
})
export class DepressionListComponent extends BaseListComponent<DepressionListModel> implements BaseListInterface {
  tableName:string ='depression'
  moduleName:string = 'MODULE.DEPRESSION'
  
  lastRemoveId:number = undefined;
  classroomOption:SelectItems[] = []
  classroomTypeOption:SelectItems[] = []
  // reportResourceByClassAndRoom:ReportModel[];
  // reportResourceByroom:ReportModel[];
  // reportResourceByclass:ReportModel[];
  // moduleNameByClassAndRoom:string = 'REPORT.DEPRESSION_BY_CALSS_AND_ROOM'
  // moduleNameByroom:string = 'REPORT.DEPRESSION_BY_ROOM'
  // moduleNameByclass:string = 'REPORT.DEPRESSION_BY_CLASS'

  // public reportOptionByClassAndRoom: OptionModel = new OptionModel();
  // public reportOptionByroom: OptionModel = new OptionModel();
  // public reportOptionByclass: OptionModel = new OptionModel();
  // moduleNameSumarize:string = 'REPORT.DEPRESSION_SUMARIZE'
  // reportResourceSumarize:ReportModel[];
  // public reportOptionSumarize: OptionModel = new OptionModel();
  constructor(private service: DepressionService,
     router:Router,route:ActivatedRoute,
     private readonly reportService:ReportService,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.reportName = 'DEPRESSION'
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
          tableName:'depression',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'depression',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        hidden:hiddent,
        enumOption:this.classroomTypeOption,
        value:classId
    },
    {
      tableName:'depression',
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
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%" 

      },   
      {
        label: 'LABEL.STUDENT_VALUE',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },   
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'typeName',
        type: ColumnType.STRING,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'room',
        type: ColumnType.STRING,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },

      {
        label: 'LABEL.DEPRESSION_OPTION_2',
        textKey: 'option2',
        type: ColumnType.DEPRESSION,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"

      },
      {
        label: 'LABEL.DEPRESSION_OPTION_3',
        textKey: 'option3',
        type: ColumnType.SUCIED,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"

      },
            {
        label: 'LABEL.FORM_DATE',
        textKey: 'updatedAt',
        type: ColumnType.DATE,
        tableName: 'depression',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STATUS',
        textKey: 'updatedAt',
        type: ColumnType.ACTION,
        tableName: 'depression',
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
    this.toItem('depression',id,isView)
  }
}
