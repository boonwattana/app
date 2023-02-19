import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentFilterListModel } from '../student-filter-model';
import { StudentFilterService } from '../student-filter.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'student-filter-list',
  templateUrl: './student-filter-list.component.html',
  styleUrls: ['./student-filter-list.component.scss']
})
export class StudentFilterListComponent extends BaseListComponent<StudentFilterListModel> implements BaseListInterface {
  tableName:string ='student_filter'
  termName:string = ''
  moduleName:string = 'MODULE.STUDENT_FILTER'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  lernStatusOption:SelectItems[] = []
  healtyStatusOption:SelectItems[] = []
  sexualStatusOption:SelectItems[] = []
  drugStatusOption:SelectItems[] = []
  gameStatusOption:SelectItems[] = []
  economicStatusOption:SelectItems[] = []
  securityStatusOption:SelectItems[] = []
  specialStatusOption:SelectItems[] = []
  electronicStatusOption:SelectItems[] = []
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
  sumarizeStatusOption:SelectItems[] = []
  reportResourceByClassAndRoom:ReportModel[];
  reportResourceByroom:ReportModel[];
  reportResourceByclass:ReportModel[];
  moduleNameByClassAndRoom:string = 'REPORT.DEPRESSION_BY_CALSS_AND_ROOM'
  moduleNameByroom:string = 'REPORT.DEPRESSION_BY_ROOM'
  moduleNameByclass:string = 'REPORT.DEPRESSION_BY_CLASS'

  public reportOptionByClassAndRoom: OptionModel = new OptionModel();
  public reportOptionByroom: OptionModel = new OptionModel();
  public reportOptionByclass: OptionModel = new OptionModel();
  moduleNameSumarize:string = 'REPORT.DEPRESSION_SUMARIZE'
  reportResourceSumarize:ReportModel[];
  public reportOptionSumarize: OptionModel = new OptionModel();

  constructor(private service: StudentFilterService,
     router:Router,route:ActivatedRoute,
     private readonly reportService:ReportService,
     private readonly userDaterService:UserDataService,
     private messageService: MessageService
    ) {
    super(router,route);
    this.termName = this.userDaterService.getTermName()
    this.canDelete = false
    this.canReportAll = this.userDaterService.isAdmin()
    this.canReportClass  = this.userDaterService.isAdmin()
    this.canReportRoom  = this.userDaterService.isTeacher()
    this.reportName = 'STUDENT_FILTER'
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
          tableName:'student_filter',
          feildName:'studentValue',
          label:'LABEL.STUDENT_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'student_filter',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        hidden:hiddent,
        enumOption:this.classroomTypeDropdown,
        value:classId
    },
    {
      tableName:'student_filter',
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
    this.setReportOptionSumarize()
    
  }
  setReportOptionSumarize():void{
    this.reportOptionSumarize = new OptionModel()
    const columnReport :ColumnModel[] = [
      {
        label: 'LABEL.SUMARIZE_STUDENT_FILTER',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.NORMAL',
        textKey: 'value1',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.RISK',
        textKey: 'value2',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.PROBLEM',
        textKey: 'value3',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
    ]
    this.reportOptionSumarize.columns = columnReport
   
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
    this.lernStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.healtyStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.sexualStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.drugStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.gameStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.economicStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.securityStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.specialStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.electronicStatusOption = this.dropdownService.getStudentFilterDropdown()
    this.sumarizeStatusOption = this.dropdownService.getStudentFilterDropdown()
    
    forkJoin(
      this.service.getClassroomDropdown(),
      this.service.getClassroomTypeDropdown(),
      // this.reportService.getReportStudentFilterByClassAndRoom(),
      // this.reportService.getReportStudentFilterByClass(),
      // this.reportService.getReportStudentFilterByRoom(),
      // this.reportService.getReportStudentFilterSumarize(),
      ).subscribe(
        ([
        classroomDropdown,
        classroomTypeDropdown,
        // rpClassAndRoom,
        // rpClass,
        // rpRoom,
        // rpSumarize
        ]) => {
        [
       this.classroomDropdown=classroomDropdown  as SelectItems[],
       this.classroomTypeDropdown=classroomTypeDropdown  as SelectItems[],
      //  this.reportResourceByClassAndRoom =rpClassAndRoom as ReportModel[],
      //  this.reportResourceByclass = rpClass as ReportModel[],
      //  this.reportResourceByroom =rpRoom  as ReportModel[],
      //  this.reportResourceSumarize =rpSumarize as ReportModel[],
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
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },
      {
        label: 'LABEL.STUDENT_ID',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.LERN_STATUS',
        textKey: 'lernStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.lernStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.HEALTY_STATUS',
        textKey: 'healtyStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.healtyStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.SEXUAL_STATUS',
        textKey: 'sexualStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.sexualStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.DRUG_STATUS',
        textKey: 'drugStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.drugStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.GAME_STATUS',
        textKey: 'gameStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.gameStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.ECONOMIC_STATUS',
        textKey: 'economicStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.economicStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.SECURITY_STATUS',
        textKey: 'securityStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.securityStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.SPECIAL_STATUS',
        textKey: 'specialStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.specialStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.ELECTRONIC_STATUS',
        textKey: 'electronicStatus',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.electronicStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"
      },
      {
        label: 'LABEL.SUMMARIZE',
        textKey: 'summarize',
        type: ColumnType.ENUM,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        enumOption:this.sumarizeStatusOption,
        width:"width:4%",
        orentation:"VERTICAL"

      },
      {
        label: 'LABEL.STATUS',
        textKey: 'summarize',
        type: ColumnType.ACTION,
        tableName: 'student_filter',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%",
        orentation:"VERTICAL"

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
    this.toItem('student-filter',id,isView)
  }
  reportClass(){
    this.service.getReportStudentFilterByClass().subscribe(result=>{
      this.downloadAsPDF(result)
    })
  }
  reportRoom(){
    const termId = this.userDaterService.getTermId()
    const roomId = this.userDaterService.getClassroomId()
    const classId = this.userDaterService.getClassroomTypeId()
    if(!roomId||!classId){
      this.messageService.add({severity:'error', summary:'ไม่มีข้อมูลชั้นเรียนหรือห้องเรียน'})
    }
    this.service.getReportStudentFilterByRoom(termId,roomId,classId).subscribe(result=>{
      this.downloadAsPDF(result)
    })
  }
  reportAll(){
    this.service.getReportStudentFilterByClassAndRoom().subscribe(result=>{
      this.downloadAsPDF(result)
    })
  }
}
