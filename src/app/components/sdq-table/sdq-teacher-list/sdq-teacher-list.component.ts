import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SdqTeacherListModel } from '../sdq-teacher-model';
import { SdqTeacherService } from '../sdq-teacher.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sdq-teacher-list',
  templateUrl: './sdq-teacher-list.component.html',
  styleUrls: ['./sdq-teacher-list.component.scss']
})
export class SdqTeacherListComponent extends BaseListComponent<SdqTeacherListModel> implements BaseListInterface {
  tableName:string ='sdq_teacher'
  moduleName:string = 'MODULE.SDQ_TABLE'
  lastRemoveId:number = undefined;
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
  statusOption:SelectItems[] = []
  classroomId: number;
  classroomTypeId: number;
        sum01_normal:number;
        sum01_risk:number;
        sum01_bad:number;
        sum02_normal:number;
        sum02_risk:number;
        sum02_bad:number;
        sum03_normal:number;
        sum03_risk:number;
        sum03_bad:number;
        sum04_normal:number;
        sum04_risk:number;
        sum04_bad:number;
        sum_normal:number;
        sum_risk:number;
        sum_bad:number;
        sum05_strong:number;
        sum05_weak:number;
        sum05:number;

  constructor(private service: SdqTeacherService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.reportName = 'SDQ_TEACHER'
  }


  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sdq_teacher',
        feildName:'nameValue',
        label:'LABEL.STUDENT_VALUE',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
    },
      {
        tableName:'sdq_teacher',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeDropdown,
        value:this.userDataService.getClassroomTypeId(),
        hidden:this.userDataService.isTeacher()
    },
    {
      tableName:'sdq_teacher',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomDropdown,
      value:this.userDataService.getClassroomId(),
      hidden:this.userDataService.isTeacher()
  },

 /* if(this.userDataService.isTeacher()){
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
  }*/
    ]
    this.searchConditions = searchConditions;
  }
  ngOnInit(): void {
    // this.getClassOfTeacher()
    this.getSumSDQTeacher()
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
    this.service.getClassroomDropdown(),
    this.service.getClassroomTypeDropdown()
    ).subscribe(
      ([
      classroomDropdown,
      classroomTypeDropdown
      ]) => {
      [
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
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'ขั้น',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      
      {
        label: '1.ด้านอารมณ์',
        //label: 'ด้านที่1 (พฤติกรรมด้านอารมณ์)',
        textKey: 'emotionalBehaviorScore01_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '2.ด้านความประพฤติ',
        //label: 'พฤติกรรมเกเร',
        textKey: 'nomalBehaviorScore02_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '3.ไม่อยู่นิ่ง',
        //label: 'พฤติกรรมสมาธิสั้น',
        textKey: 'ADHDBehaviorScore03_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '4.สัมพันธ์เพื่อน',
        //label: 'พฤติกรรมด้านความสัมพันธ์กับเพื่อน',
        textKey: 'friendBehaviorScore04_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '5.ทางสังคม',
        //label: 'พฤติกรรมด้านสัมพันธภาพทางสังคม',
        textKey: 'socialBehaviorScore05_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'รวม4ด้าน',
        textKey: 'sumScore_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      }
      ,
      {
        label: 'สถานะ',
        textKey: 'status_display',
        type: ColumnType.STRING,
        tableName: 'sdq_teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      }
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
    this.toItem('sdq-teacher',id,isView)
  }
  // async getClassOfTeacher(){
  //   this.service.getClassOfTeacher(this.userDataService.getInfoId()).subscribe(result=>{
  //       this.classroomTypeId=result.classroomTypeId;
  //       this.classroomId=result.classroomId;
  //   })
  // } 

  async getSumSDQTeacher(){
    
    var teacher_id = '0';
    if(this.userDataService.isTeacher() == true){
      teacher_id = this.userDataService.getInfoId()
    }  


    this.service.getSumSDQTeacher(teacher_id).subscribe(result=>{
      this.sum01_normal = result.sum01_normal,
      this.sum01_risk = result.sum01_risk,
      this.sum01_bad = result.sum01_bad,
      this.sum02_normal = result.sum02_normal,
      this.sum02_risk = result.sum02_risk,
      this.sum02_bad = result.sum02_bad,
      this.sum03_normal = result.sum03_normal,
      this.sum03_risk = result.sum03_risk,
      this.sum03_bad = result.sum03_bad,
      this.sum04_normal = result.sum04_normal,
      this.sum04_risk = result.sum04_risk,
      this.sum04_bad = result.sum04_bad,
      this.sum_normal = result.sum_normal,
      this.sum_risk = result.sum_risk,
      this.sum_bad = result.sum_bad,
      this.sum05_strong = result.sum05_strong,
      this.sum05_weak = result.sum05_weak,
      this.sum05  = result.sum05
    })


  }
}
