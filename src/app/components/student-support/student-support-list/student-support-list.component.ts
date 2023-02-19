import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentSupportListModel } from '../student-support-model';
import { StudentSupportService } from '../student-support.service';
@Component({
  selector: 'student-support-list',
  templateUrl: './student-support-list.component.html',
  styleUrls: ['./student-support-list.component.scss']
})
export class StudentSupportListComponent extends BaseListComponent<StudentSupportListModel> implements BaseListInterface {
  tableName:string ='student_support'
  moduleName:string = 'MODULE.STUDENT_SUPPORT'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  constructor(private service: StudentSupportService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
    this.reportName = 'STUDENT_SUPPORT'
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'student_support',
          feildName:'activityName',
          label:'LABEL.ACTIVITY_NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

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
    forkJoin(
    this.service.getTeacherDropdown(),
    ).subscribe(
      ([
      teacherOption,
      ]) => {
      [
     this.teacherOption =teacherOption  as SelectItems[],
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
        label: 'LABEL.START_DATE',
        textKey: 'startDate',
        type: ColumnType.DATE,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.END_DATE',
        textKey: 'endDate',
        type: ColumnType.DATE,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.ACTIVITY_NAME',
        textKey: 'activityName',
        type: ColumnType.STRING,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.PERFORMANCE',
        textKey: 'performance',
        type: ColumnType.STRING,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.DEPARTMENT',
        textKey: 'department',
        type: ColumnType.STRING,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.RESULT',
        textKey: 'result',
        type: ColumnType.STRING,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

      },
      {
        label: 'LABEL.TEACHER_ID',
        textKey: 'teacherValue',
        type: ColumnType.STRING,
        tableName: 'student_support',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:12%"

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
    this.toItem('student-support',id,isView)
  }
}
