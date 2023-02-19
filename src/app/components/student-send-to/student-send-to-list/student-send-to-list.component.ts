import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';

import { UserDataService } from 'src/app/shared/services/user-data.service';
import { StudentSendToListModel } from '../student-send-to-model';
import { StudentSendToService } from '../student-send-to.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
@Component({
  selector: 'student-send-to-list',
  templateUrl: './student-send-to-list.component.html',
  styleUrls: ['./student-send-to-list.component.scss']
})
export class StudentSendToListComponent extends BaseListComponent<StudentSendToListModel> implements BaseListInterface {
  tableName:string ='student_consultant'
  moduleName:string = 'MODULE.STUDENT_SEND_TO'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  teacherOption:SelectItems[] = []
  storyTypeOption:SelectItems[] = []
  resultTypeOption:SelectItems[] = []
  sentTypeOption:SelectItems[] = []
  classroomDropdown: SelectItems[] = []
  classroomTypeDropdown: SelectItems[] = []
  constructor(private service: StudentSendToService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService,
     private readonly reportService:ReportService
    ) {
    super(router,route);
    this.canCreate = false
    this.canDelete = false
    this.reportName = 'STUDENT_SEND_TO'
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'student_consultant',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName: 'student_help',
        feildName: 'classroomTypeId',
        label: 'LABEL.CLASSROOM_TYPE_ID',
        inputType: InputType.ENUM,
        operator: Operators.EQUAL,
        enumOption: this.classroomTypeDropdown,

      },
      {
        tableName: 'student_help',
        feildName: 'classroomId',
        label: 'LABEL.CLASSROOM_ID',
        inputType: InputType.ENUM,
        operator: Operators.EQUAL,
        enumOption: this.classroomDropdown,

      },
      {
          tableName:'student_consultant',
          feildName:'sentType',
          label:'LABEL.CONSULT_TEACHER_ID',
          inputType:InputType.ENUM,
          hidden:true,
          operator:Operators.EQUAL,
          value:3

      },
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
      this.service.getClassroomTypeDropdown(),
      this.service.getClassroomDropdown(),

    ).subscribe(
      ([
        studentOption,
        classroomType,
        classroom
      ]) => {
        [
          this.studentOption = studentOption as SelectItems[],
          this.classroomTypeDropdown = classroomType as SelectItems[],
          this.classroomDropdown = classroom as SelectItems[],
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
        width:"width:20%"

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
        width:"width:8%"

      },
      {
        label: 'LABEL.CONSULT_END_TIME',
        textKey: 'endTime',
        type: ColumnType.TIME,
        tableName: 'student_consultant',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

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
    this.toItem('student-send-to',id,isView)
  }
}
