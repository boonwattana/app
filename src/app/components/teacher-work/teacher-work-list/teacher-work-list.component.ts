import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { TeacherWorkListModel } from '../teacher-work-model';
import { TeacherWorkService } from '../teacher-work.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'teacher-work-list',
  templateUrl: './teacher-work-list.component.html',
  styleUrls: ['./teacher-work-list.component.scss']
})
export class TeacherWorkListComponent extends BaseListComponent<TeacherWorkListModel> implements BaseListInterface {
  tableName:string ='teacher_work'
  moduleName:string = 'MODULE.TEACHER_WORK'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  statusOption:SelectItems[] = []
  constructor(private service: TeacherWorkService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService

    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()

  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
    ]
    if(this.userDataService.isAdmin()){
      searchConditions.push(
        {
          tableName:'teacher_work',
          feildName:'teacherId',
          label:'LABEL.TEACHER_ID',
          inputType:InputType.ENUM,
          operator:Operators.EQUAL,
          enumOption:this.teacherOption,
  
      })
    }

    searchConditions.push(
      {
        tableName:'teacher_work',
        feildName:'workYear',
        label:'LABEL.WORK_YEAR',
        inputType:InputType.STRING,
        operator:Operators.LIKE,

    })
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          inputType:InputType.NUMBER,
          hidden:true,
          tableName:'teacher_work',
          feildName:'teacherId',
          label:'LABEL.LASTNAME',
          operator:Operators.EQUAL,
          value:this.infoId,
      }
      )
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
    this.statusOption = this.dropdownService.getTeacherWorkStatusDropdown()
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
        label: 'LABEL.TEACHER_ID',
        textKey: 'teacherValue',
        type: ColumnType.STRING,
        tableName: 'teacher_work',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      },
      {
        label: 'LABEL.WORK_YEAR',
        textKey: 'workYear',
        type: ColumnType.STRING,
        tableName: 'teacher_work',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      },
      {
        label: 'LABEL.INSTITUTION_NAME',
        textKey: 'institutionName',
        type: ColumnType.STRING,
        tableName: 'teacher_work',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      },
      {
        label: 'LABEL.POSITION_NAME',
        textKey: 'positionName',
        type: ColumnType.STRING,
        tableName: 'teacher_work',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
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
    this.toItem('teacher-work',id,isView)
  }
}
