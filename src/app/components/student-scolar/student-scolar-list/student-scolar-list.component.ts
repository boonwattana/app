import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentScolarListModel } from '../student-scolar-model';
import { StudentScolarService } from '../student-scolar.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'student-scolar-list',
  templateUrl: './student-scolar-list.component.html',
  styleUrls: ['./student-scolar-list.component.scss']
})
export class StudentScolarListComponent extends BaseListComponent<StudentScolarListModel> implements BaseListInterface {
  tableName:string ='student_scolar'
  moduleName:string = 'MODULE.STUDENT_SCOLAR'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
   roomId = undefined
   hiddent = false
   classId = undefined
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
  constructor(private service: StudentScolarService,
     router:Router,route:ActivatedRoute,
     private readonly reportService:ReportService,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.reportName = 'STUDENT_SCOLAR'
    this.canCreate = false
    if(this.userDataService.isTeacher()){
      this.hiddent = true
      this.roomId = this.userDataService.getClassroomId()
      this.classId = this.userDataService.getClassroomTypeId()
    }
  }
  setSerachCondtion(): void {


    const searchConditions:SearchCondition[] = [
 
      {
          tableName:'student_scolar',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'student_scolar',
          feildName:'name',
          label:'LABEL.SCOLAR_NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'student_scolar',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        hidden:this.hiddent,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeDropdown,
        value:this.classId
    },
    {
      tableName:'student_scolar',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      hidden:this.hiddent,
      enumOption:this.classroomDropdown,
      value:this.roomId
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
    this.service.getStudentDropdown(),

    this.service.getClassroomTypeDropdown(),
    this.service.getClassroomDropdown(),
    
    ).subscribe(
      ([
      studentOption,

      classroomTypeOption,
      classroomOption,

      ]) => {
      [
     this.studentOption =studentOption  as SelectItems[],

     this.classroomTypeDropdown =classroomTypeOption  as SelectItems[],
     this.classroomDropdown =classroomOption  as SelectItems[],
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
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%" 

      },   
      {
        label: 'LABEL.STUDENT_ID',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.SCOLAR_NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.SCOLAR_AMOUNT',
        textKey: 'amount',
        type: ColumnType.DECIMAL,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.YEAR',
        textKey: 'year',
        type: ColumnType.STRING,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.INTERM',
        textKey: 'inTerm',
        type: ColumnType.STRING,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.GET_FROM',
        textKey: 'getFrom',
        type: ColumnType.STRING,
        tableName: 'student_scolar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
    ];
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPage(0,false)
  }
  onView(row: RowIdentity): void {
    localStorage.setItem('STUDENT_ID',row.data.studentId)
    localStorage.setItem('STUDENT_VALUE',row.data.studentValue)    
    this.toItemPage(row.id,true)
  }
  onEdit(row: RowIdentity):void{
    localStorage.setItem('STUDENT_ID',row.data.studentId)
    localStorage.setItem('STUDENT_VALUE',row.data.studentValue)
    this.toItemPage(row.id,false)
  }
  onDelete(row: RowIdentity): void {
    this.service.delete(row.id).subscribe(result=>{
      this.lastRemoveId = result.id
    })
  }
  toItemPage(id:number,isView:boolean){
    this.toItem('student-scolar',id,isView)
  }
  
}
