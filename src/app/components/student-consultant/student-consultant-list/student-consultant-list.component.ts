import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentConsultantListModel } from '../student-consultant-model';
import { StudentConsultantService } from '../student-consultant.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'student-consultant-list',
  templateUrl: './student-consultant-list.component.html',
  styleUrls: ['./student-consultant-list.component.scss']
})
export class StudentConsultantListComponent extends BaseListComponent<StudentConsultantListModel> implements BaseListInterface {
  tableName:string ='student_consultant'
  moduleName:string = 'MODULE.STUDENT_CONSULTANT'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  teacherOption:SelectItems[] = []
  storyTypeOption:SelectItems[] = []
  resultTypeOption:SelectItems[] = []
  sentTypeOption:SelectItems[] = []
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
  constructor(private service: StudentConsultantService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService,
     private readonly userDaterService:UserDataService,
    ) {
    super(router,route);
    
    this.reportName = 'STUDENT_CONSULT'
  }
  setSerachCondtion(): void {
    let roomId = undefined
    let hiddent = false
    let classId = undefined
    if(this.userDaterService.isTeacher()){
      hiddent = true
      roomId = this.userDaterService.getClassroomId()
      classId = this.userDaterService.getClassroomTypeId()
    }
    const searchConditions:SearchCondition[] = [
      {
          tableName:'student_consultant',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'student_consultant',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        hidden:hiddent,
        enumOption:this.classroomTypeDropdown,
        value:classId
    },
    {
      tableName:'student_consultant',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      hidden:hiddent,
      enumOption:this.classroomDropdown,
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
    this.storyTypeOption = this.dropdownService.getStoryTypeDropdown()
    this.resultTypeOption = this.dropdownService.getResultTypeDropdown()
    if(this.userDataService.isGuid()){
      this.sentTypeOption = this.dropdownService.getSentTypeGuidDropdown()
    }else{
      this.sentTypeOption = this.dropdownService.getSentTypeGuidDropdown()
    }

    forkJoin(
    this.service.getStudentDropdown(),
    this.service.getClassroomDropdown(),
    this.service.getClassroomTypeDropdown(),
    ).subscribe(
      ([
      studentOption,
      classroomDropdown,
      classroomTypeDropdown,
      ]) => {
      [
     this.studentOption =studentOption  as SelectItems[],
     this.classroomDropdown=classroomDropdown  as SelectItems[],
     this.classroomTypeDropdown=classroomTypeDropdown  as SelectItems[],
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
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%" 

      },   
      {
        label: 'LABEL.STUDENT_ID',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:18%"

      },
      {
        label: 'LABEL.ACTIVITY_DATE',
        textKey: 'activityDate',
        type: ColumnType.DATE,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CONSULT_START_TIME',
        textKey: 'startTime',
        type: ColumnType.TIME,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CONSULT_END_TIME',
        textKey: 'endTime',
        type: ColumnType.TIME,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STORY_TYPE',
        textKey: 'storyType',
        type: ColumnType.ENUM,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.storyTypeOption,
        width:"width:10%"
      },
      {
        label: 'LABEL.RESULT_TYPE',
        textKey: 'resultType',
        type: ColumnType.ENUM,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.resultTypeOption,
        width:"width:10%"
      },
      {
        label: 'LABEL.SENT_TYPE',
        textKey: 'sentType',
        type: ColumnType.ENUM,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.sentTypeOption,
        width:"width:10%"
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
    this.toItem('student-consultant',id,isView)
  }
}
