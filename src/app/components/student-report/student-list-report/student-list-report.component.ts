import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter, SearchResult } from 'src/app/shared/models/search-param-model';
import { StudentReportService } from '../student-report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { StudentReportListModel } from '../student-model-report';
@Component({
  selector: 'student-list-report',
  templateUrl: './student-list-report.component.html',
  styleUrls: ['./student-list-report.component.scss']
})
export class StudentListReportComponent extends BaseListComponent<StudentReportListModel> implements BaseListInterface {
  tableName:string ='student'
  moduleName:string = 'MODULE.STUDENT_REPORT'

  lastRemoveId:number = undefined;
  statusOption:SelectItems[] = []
  gendarOption:SelectItems[] = []
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []

  canEdit:boolean = false
  canRequest:boolean = true

  reportResourceByroom:ReportModel[];
  reportResourceByclass:ReportModel[];
  reportResourceSumarize:ReportModel[];
  moduleNameByroom:string = 'REPORT.STUDENT_BY_ROOM'
  moduleNameByclass:string = 'REPORT.STUDENT_BY_CLASS'
  moduleNameSumarize:string = 'REPORT.STUDENT_SUMARIZE'
  public reportOptionByroom: OptionModel = new OptionModel();
  public reportOptionByclass: OptionModel = new OptionModel();
  public reportOptionSumarize: OptionModel = new OptionModel();
  constructor(private service: StudentReportService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService

    ) {
    super(router,route);
      this.userType= this.userDataService.getUserType()
      this.infoId = this.userDataService.getInfoId()
      
      this.canCreate = this.userDataService.getUserType()!= 'Student'
      this.canDelete = this.userDataService.getUserType()!= 'Student'
      this.userType= this.userDataService.getUserType()
      if(this.userType == 'Admin' ){
        this.canEdit = true
        this.canRequest = true
      }else{
        this.canEdit = this.userDataService.getCanEdit()
        this.canRequest = this.canEdit
      }
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'student',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeDropdown
    },
    {
      tableName:'student',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomDropdown
  },
  {
    tableName:'student',
    feildName:'status',
    label:'LABEL.STATUS',
    inputType:InputType.ENUM,
    operator:Operators.EQUAL,
    enumOption:this.statusOption
},


    ]
    if(this.userType=='Student'){
      searchConditions.push({
        tableName: 'student',
        feildName: 'id',
        value:this.infoId,
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
    this.statusOption = this.dropdownService.getStatusDropdown()
    forkJoin(
    this.service.getGendarDropdown(),
    this.service.getClassroomDropdown(),
    this.service.getClassroomTypeDropdown(),

    ).subscribe(
      ([
      gendarOption,
      classroomDropdown,
      classroomTypeDropdown,

      ]) => {
      [
     this.gendarOption =gendarOption  as SelectItems[],
     this.classroomDropdown=classroomDropdown  as SelectItems[],
     this.classroomTypeDropdown=classroomTypeDropdown  as SelectItems[],

     this.setSerachCondtion()
      ]
      }) 
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
      tableName: 'student',
      visibility: true,
      sorting: SortType.ASC,
      width:"width:5%"

    },
      {
        label: 'LABEL.STUDENT_CODE',
        textKey: 'studentCode',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:9%"

      },
     
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },
      {
        label: 'LABEL.STATUS',
        textKey: 'status',
        type: ColumnType.ENUM,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%",
        enumOption: this.statusOption,
      },
      {
        label: 'LABEL.PHONE_NUMBER',
        textKey: 'phoneNumber',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:16%"

      },
      {
        label: 'LABEL.PERSONAL_CODE',
        textKey: 'personalCode',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:21%"

      },
      {
        label: 'LABEL.BIRTH_DATE',
        textKey: 'birthDate',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.ADDRESS',
        textKey: 'addressValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:16%"

      },
    ];
    
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPage(0,false)
  }
  onView(row: RowIdentity): void {
    // this.router.navigate([`student/view/${row}`]);
    this.toItemPage(row.id,true)
  }
  onEdit(row: RowIdentity):void{
    this.toItemPage(row.id,false)
  }
  onDelete(row: RowIdentity): void {

  }
  toItemPage(id:number,isView:boolean){
    if(!this.canRequest&&!isView){
      this.toList('edit-request')

    }else{
      this.toItem('student',id,isView)

    }
  }
}
