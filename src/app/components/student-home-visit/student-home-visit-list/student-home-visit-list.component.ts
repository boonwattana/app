import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentHomeVisitListModel } from '../student-home-visit-model';
import { StudentHomeVisitService } from '../student-home-visit.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
@Component({
  selector: 'student-home-visit-list',
  templateUrl: './student-home-visit-list.component.html',
  styleUrls: ['./student-home-visit-list.component.scss']
})

export class StudentHomeVisitListComponent extends BaseListComponent<StudentHomeVisitListModel> implements BaseListInterface {
  tableName:string ='student_home_visit'
  moduleName:string = 'MODULE.STUDENT_HOME_VISIT'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  classroomOption:SelectItems[] = []
  classroomTypeOption:SelectItems[] = []
  // moduleNameSumarize:string = 'REPORT.HOME_VISIT_SUMARIZE'
  // reportResourceSumarize:ReportModel[];
  // public reportOptionSumarize: OptionModel = new OptionModel();
  constructor(private service: StudentHomeVisitService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService,
     private readonly reportService:ReportService
    ) {
    super(router,route);
    this.canCreate = false
    this.canDelete = false
    this.reportName = 'HOME_VISIT'
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
    // if(this.userDataService.isGuid()){
    //   hiddent = false
    // }
    const searchConditions:SearchCondition[] = [
      {
        tableName:'student_home_visit',
        feildName:'studentValue',
        label:'LABEL.STUDENT_VALUE',
        inputType:InputType.STRING,
        operator:Operators.LIKE,


    },
    {
      tableName:'student_home_visit',
      feildName:'classroomTypeId',
      label:'LABEL.CLASSROOM_TYPE_ID',
      inputType:InputType.ENUM,
      hidden:hiddent,
      operator:Operators.EQUAL,
      enumOption:this.classroomTypeOption,
      value:classId
  },
  {
    tableName:'student_home_visit',
    feildName:'classroomId',
    label:'LABEL.CLASSROOM_ID',
    inputType:InputType.ENUM,
    operator:Operators.EQUAL,
    hidden:hiddent,
    enumOption:this.classroomOption,
    value:roomId
    }
  ]
  if(this.userDataService.isTeacher()){
   const classroomId = this.userDataService.getClassroomId()
   const classroomTypeId = this.userDataService.getClassroomTypeId()
    searchConditions.push({
      tableName: 'student_home_visit',
      feildName: 'classroomTypeId',
      value:classroomTypeId,
      inputType:InputType.NUMBER,
      hidden:true,
      operator:Operators.EQUAL,

    })
    searchConditions.push({
      tableName: 'student_home_visit',
      feildName: 'classroomId',
      value:classroomId,
      inputType:InputType.NUMBER,
      hidden:true,
      operator:Operators.EQUAL,

    })
    }
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
    this.option.canCreate = false;
    this.option.canView = false;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STUDENT_VALUE',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"

      },
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'classroomTypeValue',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STATUS',
        textKey: 'yearTermId',
        type: ColumnType.ACTION,
        tableName: 'student_home_visit',
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
    this.toItem('student-home-visit',id,isView)
  }

}
