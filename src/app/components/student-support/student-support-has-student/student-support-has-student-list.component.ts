import { Component, EventEmitter, Input, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter, SearchResult } from 'src/app/shared/models/search-param-model';
import { StudentSupportListModel } from '../student-support-model';
import { StudentSupportService } from '../student-support.service';
import { StudentListModel } from '../../student/student-model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'student-support-has-student-list',
  templateUrl: './student-support-has-student-list.component.html',
  styleUrls: ['./student-support-has-student-list.component.scss']
})
export class StudentSupportHasStudentListComponent {
  view:boolean = false
  tableName:string ='student_support'
  moduleName:string = 'MODULE.STUDENT_SUPPORT'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  public option: OptionModel = new OptionModel();
  searchResult: SearchResult<StudentSupportListModel>;
  searchParam: SearchParameter;
  searchConditions:SearchCondition[] =[]
  canCreate:boolean = true
  cenEdit:boolean = true
  canDelete:boolean = true
  canReportClass:boolean = false
  canReportRoom:boolean = false
  canReportAll:boolean = false
  reportName:string = ''
  public userType:string= '';
  public infoId:string = '';
  optionStudent: OptionModel = new OptionModel();
  searchResultStudent:SearchResult<StudentListModel>;
  searchConditionsStudent:SearchCondition[] =[]
  tableNameStudent ='student_list'
  lastRemoveIdStudent=''

  optionHasStudent: OptionModel = new OptionModel();
  searchResultHasStudent:SearchResult<StudentListModel>;
  searchConditionsHasStudent:SearchCondition[] =[]
  tableNameHasStudent = 'has_student_list'
  lastRemoveIdHasStudent = ''
  moduleNameHasStudent = ''
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
 reportNameHasStudent  =''
 id = 0
  constructor(private service: StudentSupportService,
     router:Router,private readonly route:ActivatedRoute,
     private messageService: MessageService
    ) {
    this.reportName = 'STUDENT_SUPPORT'
    this.id = this.getParam()
  }
  getParam():number {
    const modelId =  this.route.snapshot.params as {id}
    return modelId.id;
  }
  @Output() addEmit = new EventEmitter();
  @Output() removeEmit = new EventEmitter();
  setDataGridOption(): void {

  }
  @Input()
  set setView(arg:boolean){

    this.view = arg
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
    this.setSerachCondtionStudent()
    this.setSerachCondtionHasStudent()
    this.setDataGridOptionStudent()
    this.setDataGridOptionHasStudent()
  }
  setSerachCondtionHasStudent(): void {
    const searchConditions:SearchCondition[] = [
   
 
      {
          tableName:'has_student_list',
          feildName:'nameValue',
          label:'LABEL.NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },

      {
        tableName:'has_student_list',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeDropdown
    },
    {
      tableName:'has_student_list',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomDropdown
  },
  {
    tableName:'has_student_list',
    feildName:'studentSupportId',
    label:'LABEL.CLASSROOM_TYPE_ID',
    inputType:InputType.HIDDEN,
    hidden:true,
    operator:Operators.EQUAL,
    value:this.id
},

]
    this.searchConditionsHasStudent = searchConditions;
  }
  setSerachCondtionStudent(): void {
    const searchConditions:SearchCondition[] = [
   
 
      {
          tableName:'student',
          feildName:'nameValue',
          label:'LABEL.NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },

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
  },]
    this.searchConditionsStudent = searchConditions;
  }
  onSearch(searchParameter: SearchParameter): void {        
    this.service.getList(searchParameter).subscribe(result=>{      
      this.searchResult = result
    })
  }
  onSearchHasStudent(searchParameter: SearchParameter): void {      
    searchParameter.tableKey = this.tableNameHasStudent  
    this.service.getListHasStudent(searchParameter).subscribe(result=>{      
      this.searchResultHasStudent = result
    })
  }
  onSearchStudent(searchParameter: SearchParameter): void {     


    this.service.getListStudent(searchParameter).subscribe(result=>{      
      this.searchResultStudent = result
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {
    forkJoin(
    this.service.getTeacherDropdown(),
    this.service.getClassroomDropdown(),
    this.service.getClassroomTypeDropdown(),
    ).subscribe(
      ([
      teacherOption,
      classroomDropdown,
      classroomTypeDropdown,
      ]) => {
      [
     this.teacherOption =teacherOption  as SelectItems[],
     this.classroomDropdown=classroomDropdown  as SelectItems[],
     this.classroomTypeDropdown=classroomTypeDropdown  as SelectItems[],
     this.setSerachCondtionStudent(),
     this.setSerachCondtionHasStudent()
      ]
      }),
      (error) => {
      }
  }
  setDataGridOptionHasStudent(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.STUDENT_CODE',
        textKey: 'studentCode',
        type: ColumnType.STRING,
        tableName: this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName:  this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName:  this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.GENDAR_ID',
        textKey: 'gendarValue',
        type: ColumnType.STRING,
        tableName:  this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'classroomTypeValue',
        type: ColumnType.STRING,
        tableName:  this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName:  this.tableNameHasStudent,
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
    ];
    
    this.optionHasStudent.columns = columns;
  }
  setDataGridOptionStudent(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.STUDENT_CODE',
        textKey: 'studentCode',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.GENDAR_ID',
        textKey: 'gendarValue',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'classroomTypeValue',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'student_list',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
    ];
    
    this.optionStudent.columns = columns;
  }

  onDelete(row: RowIdentity): void {
    this.service.delete(row.id).subscribe(result=>{
      this.lastRemoveId = result.id
    })
  }

  onAddStudent(row: RowIdentity): void {
    const h = this.searchResultHasStudent.results.find(fl=>fl.id == row.id)
    if(h){
      this.messageService.add({severity:'error', summary:'นักเรียนได้เข้าร่วมกิจกรรมแล้ว'})

    }else{
      this.service.checkIsExist(row.id,this.id).subscribe(result=>{
        if(result){
          const model = this.searchResultStudent.results.find(fl=>fl.id == row.id)
          if(!this.searchResultHasStudent){
            this.searchResultHasStudent = new SearchResult<StudentListModel>()
          }
          this.searchResultHasStudent.results.push(model)
          this.searchResultStudent.results.splice(this.getIndex(row.id),1)
        this.addEmit.emit(row.id);
        }else{
          this.messageService.add({severity:'error', summary:'นักเรียนได้เข้าร่วมกิจกรรมแล้ว'})

        }
        
      })
    

    }

    
  }
  getIndex(id: number) {
    const index = this.searchResultStudent.results.findIndex(d=>d.id == id)
    return index
    
  }
  getIndexHas(id: number) {
    const index = this.searchResultHasStudent.results.findIndex(d=>d.id == id)
    return index
    
  }
  onDeleteHasStudent(row: RowIdentity): void {    
    const model = this.searchResultHasStudent.results.find(fl=>fl.id == row.id)

    this.searchResultStudent.results.push(model)
    this.searchResultHasStudent.results.splice(this.getIndexHas(row.id),1)
    this.removeEmit.emit(row.id);
    // this.service.delete(row.id).subscribe(result=>{
    //   this.lastRemoveId = result.id
    // })
  }
}
