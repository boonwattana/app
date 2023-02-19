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
import { ReportModel } from 'src/app/shared/models/report.model';
import { TeacherReportListModel } from '../teacher-report-model';
import { TeacherReportService } from '../teacher-report.service';
@Component({
  selector: 'teacher-list-report',
  templateUrl: './teacher-list-report.component.html',
  styleUrls: ['./teacher-list-report.component.scss']
})
export class TeacherListReportComponent extends BaseListComponent<TeacherReportListModel> implements BaseListInterface {
  tableName:string ='teacher'
  moduleName:string = 'MODULE.TEACHER_REPORT'
  moduleNameBySubject:string = 'REPORT.TEACHER_BY_SUBJECT'
  moduleNameSumarize:string = 'REPORT.TEACHER_SUMARIZE'
  lastRemoveId:number = undefined;
  practicleOption:SelectItems[] = []
  reportResourceBySubject:ReportModel[];
  reportResourceSumarize:ReportModel[];
  positionNameOption:SelectItems[]=[]
  positionNoOption:SelectItems[]=[]

  public reportOptionBySubject: OptionModel = new OptionModel();
  public reportOptionSumarize: OptionModel = new OptionModel();
  constructor(private service: TeacherReportService,
    private userDataService:UserDataService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
    this.canCreate = this.userDataService.isAdmin()
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'teacher',
        feildName:'subjectGroupId',
        label:'LABEL.PRACTICLE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.practicleOption
    },
 
    ]
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          inputType:InputType.NUMBER,
          hidden:true,
          tableName:'teacher',
          feildName:'id',
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
    searchParameter.paginator = { page: 0, first: 0, rows: 10000, pageCount: 0 }
    
    this.service.getList(searchParameter).subscribe(result=>{      
      this.searchResult = result
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {
    this.positionNameOption = this.dropdownService.getTeacherPositionNameDropdown()
    this.positionNoOption = this.dropdownService.getTeacherPractitionerDropdown()
    forkJoin(
    this.service.getPracticleDropdown(),

    ).subscribe(
      ([
        practicleOption,

      ]) => {
      [
     this.practicleOption =practicleOption  as SelectItems[],

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
        label: 'LABEL.FIRSTNAME',
        textKey: 'firstname',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:16%"
      },
      {
        label: 'LABEL.LASTNAME',
        textKey: 'lastname',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"
      },
      {
        label: 'LABEL.POSITION_NAME',
        textKey: 'positionName',
        type: ColumnType.ENUM,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        enumOption:this.positionNameOption,
        width:"width:8%"
      },
      {
        label: 'LABEL.PRACTITIONER_NO',
        textKey: 'practitionerNo',
        type: ColumnType.ENUM,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        enumOption:this.positionNoOption,
        width:"width:8%"
      },
      
      {
        label: 'LABEL.PRACTITIONER_LEVEL_ID',
        textKey: 'practitionerLevelValue',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.BIRTH_DATE',
        textKey: 'birthDate',
        type: ColumnType.DATE,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.SET_IN_DATE',
        textKey: 'setInDate',
        type: ColumnType.DATE,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.EDUCATION_MAJOR',
        textKey: 'educationMajor',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.EDUCATION_MINOR',
        textKey: 'educationMinor',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.ACTION_WORK',
        textKey: 'actionWork',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.ACTION_WORK_SPECIAL',
        textKey: 'actionWorkSpecial',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.SET_IN_DATE_SCHOOL',
        textKey: 'setInDateSchool',
        type: ColumnType.DATE,
        tableName: 'teacher',
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
    this.toItem('teacher',id,isView)
  }
}
