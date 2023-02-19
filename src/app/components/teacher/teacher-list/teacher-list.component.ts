import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { TeacherListModel } from '../teacher-model';
import { TeacherService } from '../teacher.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { SelectFieldOption } from 'src/app/shared/models/configs';
import { TEACHER_FIELD_NAME } from 'src/app/shared/constants/field-name-constanst';
@Component({
  selector: 'teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent extends BaseListComponent<TeacherListModel> implements BaseListInterface {
  tableName:string ='teacher'
  moduleName:string = 'MODULE.TEACHER'
  typeOption:SelectItems[] = []
  // moduleNameBySubject:string = 'REPORT.TEACHER_BY_SUBJECT'
  // moduleNameSumarize:string = 'REPORT.TEACHER_SUMARIZE'
  lastRemoveId:number = undefined;
   practitionerLevelOption:SelectItems[] = []
   bindingFieldOption:SelectFieldOption[]
  // reportResourceBySubject:ReportModel[];
  // reportResourceSumarize:ReportModel[];
  // public reportOptionBySubject: OptionModel = new OptionModel();
  // public reportOptionSumarize: OptionModel = new OptionModel();

  positionNameOption:SelectItems[]=[]
  positionNoOption:SelectItems[]=[]

  constructor(private service: TeacherService,
    private userDataService:UserDataService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
    this.canCreate = this.userDataService.isAdmin()
    if(this.userDataService.isHuman()){
      this.canCreate = true
    }
    this.bindingFieldOption = TEACHER_FIELD_NAME.map(m=>{
      return {
        en:m.en,
        th:m.th,
        active:false
      }
    })
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
    {
        tableName:'teacher',
        feildName:'firstname',
        label:'LABEL.FIRSTNAME',
        inputType:InputType.STRING,
        operator:Operators.LIKE,

    },
    {
        tableName:'teacher',
        feildName:'lastname',
        label:'LABEL.LASTNAME',
        inputType:InputType.STRING,
        operator:Operators.LIKE,

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
    // this.setReportOptionBySubject()
    // this.setReportOptionSumarize()
  }
  // setReportOptionBySubject():void{
  //   this.reportOptionBySubject = new OptionModel()
  //   const columnReport :ColumnModel[] = [
  //     {
  //       label: 'LABEL.TEA_SUBJECT_NAME',
  //       textKey: 'name',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:50%"

  //     },
     
  //     {
  //       label: 'LABEL.COUNT_TEACTER',
  //       textKey: 'value1',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:50%"

  //     }
  //   ]
  //   this.reportOptionBySubject.columns = columnReport
   
  // }
  // setReportOptionSumarize():void{
  //   this.reportOptionSumarize = new OptionModel()
  //   const columnReport :ColumnModel[] = [
  //     {
  //       label: 'LABEL.ALL_TEACHER',
  //       textKey: 'name',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
     
  //     {
  //       label: 'LABEL.TEA_MALE',
  //       textKey: 'value1',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.TEA_FEMALE',
  //       textKey: 'value2',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.TEA_MOVED',
  //       textKey: 'value3',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
  //       visibility: true,
  //       sorting: SortType.NONE,
  //       width:"width:20%"

  //     },
  //     {
  //       label: 'LABEL.TEA_ERNLY',
  //       textKey: 'value4',
  //       type: ColumnType.STRING,
  //       tableName: 'teacher',
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
    this.positionNameOption = this.dropdownService.getTeacherPositionNameDropdown()
    forkJoin(
    this.service.getPractitionerLevelDropdown(),
    // this.service.getRpBySubject(),
    // this.service.getRpSumarize(),
    ).subscribe(
      ( practitionerLevelOption ) => {
      [
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
      // {
      //   label: 'LABEL.TEACHER_CODE',
      //   textKey: 'teacherCode',
      //   type: ColumnType.STRING,
      //   tableName: 'teacher',
      //   visibility: true,
      //   sorting: SortType.NONE,
      //   width:"width:16%"
      // },
      {
        label: 'LABEL.TITLE',
        textKey: 'titleName',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
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
        width:"width:16%"
      },
      // {
      //   label: 'LABEL.POSITION_NUMBER',
      //   textKey: 'positionNumber',
      //   type: ColumnType.STRING,
      //   tableName: 'teacher',
      //   visibility: true,
      //   sorting: SortType.NONE,
      //   width:"width:10%"
      // },

      {
        label: 'LABEL.POSITION_NAME',
        textKey: 'positionName',
        type: ColumnType.ENUM,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.positionNameOption,
        width:"width:12%"

        // label: 'LABEL.POSITION_NAME',
        // textKey: 'positionName',
        // type: ColumnType.STRING,
        // tableName: 'teacher',
        // visibility: true,
        // sorting: SortType.NONE,
        // width:"width:12%"
      },

      {
        label: 'LABEL.PRACTITIONER_LEVEL_ID',
        textKey: 'practitionerLevelValue',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"
      },
      {
        label: 'LABEL.SUBJECT_GROUP_ID',
        textKey: 'subjectGroupValue',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"
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
