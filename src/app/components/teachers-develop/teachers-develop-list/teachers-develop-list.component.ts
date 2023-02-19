import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { TeachersDevelopListModel } from '../teachers-develop-model';
import { TeachersDevelopService } from '../teachers-develop.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'teachers-develop-list',
  templateUrl: './teachers-develop-list.component.html',
  styleUrls: ['./teachers-develop-list.component.scss']
})
export class TeachersDevelopListComponent extends BaseListComponent<TeachersDevelopListModel> implements BaseListInterface {
  tableName:string ='teachers_develop'
  moduleName:string = 'MODULE.TEACHERS_DEVELOP'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  curriculumOption:SelectItems[] = []
  practitionerLevelOption:SelectItems[] = []
  constructor(private service: TeachersDevelopService,
     router:Router,route:ActivatedRoute,
     private userDataService:UserDataService
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
          tableName:'teachers_develop',
          feildName:'teacherId',
          label:'LABEL.TEACHER_ID',
          inputType:InputType.ENUM,
          operator:Operators.EQUAL,
          hidden:!this.userDataService.isAdmin(),
          enumOption:this.teacherOption
      })
    }
    searchConditions.push(
      {
        tableName:'teachers_develop',
        feildName:'subjectName',
        label:'LABEL.SUBJECT_NAME',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
    }
    )
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          inputType:InputType.NUMBER,
          hidden:true,
          tableName:'teachers_develop',
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
    forkJoin(
    this.service.getTeacherDropdown(),
    this.service.getCurriculumDropdown(),
    this.service.getPracticleDropdown(),
    ).subscribe(
      ([
      teacherOption,
      curriculumOption,
      practitionerLevelOption,
      ]) => {
      [
     this.teacherOption =teacherOption  as SelectItems[],
     this.curriculumOption =curriculumOption  as SelectItems[],
     this.practitionerLevelOption =practitionerLevelOption  as SelectItems[],
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
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.EDUCATION_YEAR',
        textKey: 'educationYear',
        type: ColumnType.STRING,
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'LABEL.SUBJECT_NAME',
        textKey: 'subjectName',
        type: ColumnType.STRING,
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.CURRICULUM_ID_VALUE',
        textKey: 'curriculumValue',
        type: ColumnType.STRING,
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.PRACTICLE_ID',
        textKey: 'practicleValue',
        type: ColumnType.STRING,
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.TOTAL_HOUR',
        textKey: 'totalHour',
        type: ColumnType.DECIMAL,
        tableName: 'teachers_develop',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'LABEL.INSTITUTION_NAME_VALUE',
        textKey: 'institutionName',
        type: ColumnType.STRING,
        tableName: 'teachers_develop',
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
    this.toItem('teachers-develop',id,isView)
  }
}
