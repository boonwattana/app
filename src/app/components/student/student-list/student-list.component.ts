import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter, SearchResult } from 'src/app/shared/models/search-param-model';
import { StudentListModel } from '../student-model';
import { StudentService } from '../student.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { SelectFieldOption } from 'src/app/shared/models/configs';
import { STUDENT_FIELD_NAME } from 'src/app/shared/constants/field-name-constanst';
@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends BaseListComponent<StudentListModel> implements BaseListInterface {
  tableName:string ='student'
  moduleName:string = 'MODULE.STUDENT'

  lastRemoveId:number = undefined;
  statusOption:SelectItems[] = []
  gendarOption:SelectItems[] = []
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []

  canEdit:boolean = false
  canRequest:boolean = true
  bindingFieldOption:SelectFieldOption[] =[]
  constructor(private service: StudentService,
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
      this.bindingFieldOption = STUDENT_FIELD_NAME.map(m=>{
        return {
          en:m.en,
          th:m.th,
          active:false
        }
      })
  }
  setSerachCondtion(): void {
    let roomId = undefined
    let hiddent = false
    let classId = undefined
    if(this.userDataService.isTeacher()){
      hiddent = true
      roomId = this.userDataService.getClassroomId()
      classId = this.userDataService.getClassroomTypeId()      
    }
    const searchConditions:SearchCondition[] = [
    //   {
    //     tableName:'student',
    //     feildName:'personalCode',
    //     label:'LABEL.PERSONAL_CODE',
    //     inputType:InputType.STRING,
    //     operator:Operators.LIKE,

    // },
      {
          tableName:'student',
          feildName:'studentCode',
          label:'LABEL.STUDENT_CODE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },

      {
        tableName:'student',
        feildName:'studentNumber',
        label:'LABEL.STUDENT_NUMBER',
        inputType:InputType.NUMBER,
        operator:Operators.LIKE,

    },

 
      {
          tableName:'student',
          feildName:'nameValue',
          label:'LABEL.NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      // {
      //     tableName:'student',
      //     feildName:'lastname',
      //     label:'LABEL.LASTNAME',
      //     inputType:InputType.STRING,
      //     operator:Operators.LIKE,

      // },
      {
        tableName:'student',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        hidden:hiddent,
        value:classId,
        enumOption:this.classroomTypeDropdown
    },
    {
      tableName:'student',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      hidden:hiddent,
      value:roomId,
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
        label: 'LABEL.STUDENT_CODE',
        textKey: 'studentCode',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.ASC,
        width:"width:10%"
      },
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.GENDAR_ID',
        textKey: 'gendarValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'classroomTypeValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

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
    ];
    
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPageCreate(0,false)
  }
  onView(row: RowIdentity): void {
    // this.router.navigate([`student/view/${row}`]);
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
  toItemPageCreate(id:number,isView:boolean){
      this.toItem('student',id,isView)
  }
  toItemPage(id:number,isView:boolean){
    if(!this.canRequest&&!isView){
      this.toList('edit-request')

    }else{
      this.toItem('student',id,isView)

    }
  }
}
