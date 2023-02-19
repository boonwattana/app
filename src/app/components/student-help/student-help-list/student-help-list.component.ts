import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentHelpListModel } from '../student-help-model';
import { StudentHelpService } from '../student-help.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
@Component({
  selector: 'student-help-list',
  templateUrl: './student-help-list.component.html',
  styleUrls: ['./student-help-list.component.scss']
})
export class StudentHelpListComponent extends BaseListComponent<StudentHelpListModel> implements BaseListInterface {
  tableName: string = 'student_help'
  moduleName: string = 'MODULE.STUDENT_HELP'
  lastRemoveId: number = undefined;
  studentOption: SelectItems[] = []
  resultHelpTypeOption: SelectItems[] = []
  roomId = undefined
  hiddent = false
  classId = undefined
  classroomDropdown: SelectItems[] = []
  classroomTypeDropdown: SelectItems[] = []
  
  constructor(private service: StudentHelpService,
    router: Router, route: ActivatedRoute,
    private readonly reportService: ReportService
  ) {
    super(router, route);
    this.canCreate = false
    this.canDelete = false
    this.reportName = 'STUDENT_HELP'
  }
  setSerachCondtion(): void {
    const searchConditions: SearchCondition[] = [
      {
        tableName: 'student_help',
        feildName: 'studentValue',
        label: 'LABEL.STUDENT_ID',
        inputType: InputType.STRING,
        operator: Operators.LIKE,

      },
      {
        tableName: 'student_help',
        feildName: 'activityName',
        label: 'LABEL.ACTIVITY_NAME',
        inputType: InputType.STRING,
        operator: Operators.LIKE,

      },
      {
        tableName: 'student_help',
        feildName: 'classroomTypeId',
        label: 'LABEL.CLASSROOM_TYPE_ID',
        inputType: InputType.ENUM,
        operator: Operators.EQUAL,
        hidden: this.hiddent,
        enumOption: this.classroomTypeDropdown,
        value: this.roomId

      },
      {
        tableName: 'student_help',
        feildName: 'classroomId',
        label: 'LABEL.CLASSROOM_ID',
        inputType: InputType.ENUM,
        operator: Operators.EQUAL,
        hidden: this.hiddent,
        enumOption: this.classroomDropdown,
        value: this.roomId

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
    this.service.getList(searchParameter).subscribe(result => {
      this.searchResult = result
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {
    this.resultHelpTypeOption = this.dropdownService.getResultHelpTypeDropdown()
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
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:7%"

      }, {
        label: 'LABEL.STUDENT_ID',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:20%"

      },
      {
        label: 'LABEL.ACTIVITY_NAME',
        textKey: 'activityName',
        type: ColumnType.STRING,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:15%"
      },
      {
        label: 'LABEL.START_DATE',
        textKey: 'startDate',
        type: ColumnType.DATE,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%"
      },
      {
        label: 'LABEL.END_DATE',
        textKey: 'endDate',
        type: ColumnType.DATE,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%"

      },
      {
        label: 'LABEL.RESULT_HELP_TYPE',
        textKey: 'resultHelpType',
        type: ColumnType.ENUM,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.resultHelpTypeOption,
        width: "width:10%"
      },
      {
        label: 'LABEL.RESULT_TEXT_VALUE',
        textKey: 'resultText',
        type: ColumnType.STRING,
        tableName: 'student_help',
        visibility: true,
        sorting: SortType.NONE,
        width: "width:12%"

      },
    ];
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPage(0, false)
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
    this.service.delete(row.id).subscribe(result => {
      this.lastRemoveId = result.id
    })
  }
  toItemPage(id: number, isView: boolean) {
    this.toItem('student-help', id, isView)
  }
}
