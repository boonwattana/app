import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { CheckStudentListModel } from '../check-student-model';
import { CheckStudentService } from '../check-student.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ReportModel } from 'src/app/shared/models/report.model';
@Component({
  selector: 'check-student-list',
  templateUrl: './check-student-list.component.html',
  styleUrls: ['./check-student-list.component.scss']
})
export class CheckStudentListComponent extends BaseListComponent<CheckStudentListModel> implements BaseListInterface {
  tableName:string ='check_student'
  moduleName:string = 'MODULE.CHECK_STUDENT'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  classroomOption:SelectItems[] = []
  classroomTypeOption:SelectItems[] = []
  // public reportOptionSumarize: OptionModel = new OptionModel();
  // reportResourceSumarize:ReportModel[];
  // moduleNameSumarize:string = 'REPORT.CHECK_STUDENT_SUMARIZE'
  constructor(private service: CheckStudentService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.canCreate = false
    this.canDelete = false
    this.reportName = 'CHECK_STUDENT'
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
          tableName:'check_student',
          feildName:'studentValue',
          label:'LABEL.STUDENT_VALUE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,


      },
      {
        tableName:'check_student',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeOption,
        hidden:hiddent,
        value:classId
    },
    {
      tableName:'check_student',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomOption,
      hidden:hiddent
  },
    ]
    if(this.userDataService.isTeacher()){
     const classroomId = this.userDataService.getClassroomId()
     const classroomTypeId = this.userDataService.getClassroomTypeId()
      searchConditions.push({
        tableName: 'check_student',
        feildName: 'classroomTypeId',
        value:classroomTypeId,
        inputType:InputType.NUMBER,
        hidden:true,
        operator:Operators.EQUAL,

      })
      searchConditions.push({
        tableName: 'check_student',
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
    // this.setReportOptionSumarize()
  }
  // setReportOptionSumarize():void{
  //   this.reportOptionSumarize = new OptionModel()
  //   const columnReport :ColumnModel[] = [
  //     {
  //       label: 'LABEL.CHECK_THIN',
  //       textKey: 'name',
  //       type: ColumnType.STRING,
  //       tableName: 'check_student',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
     
  //     {
  //       label: 'LABEL.CHECK_NORMAL',
  //       textKey: 'value1',
  //       type: ColumnType.STRING,
  //       tableName: 'check_student',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.CHACK_FAT',
  //       textKey: 'value2',
  //       type: ColumnType.STRING,
  //       tableName: 'check_student',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.CHECK_FATLY',
  //       textKey: 'value3',
  //       type: ColumnType.STRING,
  //       tableName: 'check_student',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.CHECK_VERY_FAT',
  //       textKey: 'value4',
  //       type: ColumnType.STRING,
  //       tableName: 'check_student',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //   ]
  //   this.reportOptionSumarize.columns = columnReport
   
  // }
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
    //  this.reportResourceSumarize = rpSumarize as ReportModel[],
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
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },   
      {
        label: 'LABEL.STUDENT_VALUE',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },   
      {
        label: 'LABEL.GENDAR_VALUE',
        textKey: 'gendarValue',
        type: ColumnType.STRING,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'LABEL.AGE',
        textKey: 'birthDate',
        type: ColumnType.AGE,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'classroomTypeValue',
        type: ColumnType.STRING,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      
      // {
      //   label: 'LABEL.WEIGHT',
      //   textKey: 'weight',
      //   type: ColumnType.DECIMAL,
      //   tableName: 'check_student',
      //   visibility: true,
      //   sorting: SortType.NONE,
      //   width:"width:8%"

      // },
      // {
      //   label: 'LABEL.HEIGHT',
      //   textKey: 'height',
      //   type: ColumnType.DECIMAL,
      //   tableName: 'check_student',
      //   visibility: true,
      //   sorting: SortType.NONE,
      //   width:"width:8%"

      // },
      {
        label: 'LABEL.BMI',
        textKey: 'bmi',
        type: ColumnType.DECIMAL,
        tableName: 'check_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      // {
      //   label: 'LABEL.BMI_VALUE',
      //   textKey: 'bmi',
      //   type: ColumnType.BMI,
      //   tableName: 'check_student',
      //   visibility: true,
      //   sorting: SortType.NONE,
      //   width:"width:8%"

      // },
      {
        label: 'LABEL.STATUS',
        textKey: 'yearTermId',
        type: ColumnType.ACTION,
        tableName: 'check_student',
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
    this.toItem('check-student',id,isView)
  }
}
