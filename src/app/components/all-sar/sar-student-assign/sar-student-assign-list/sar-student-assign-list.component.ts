import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarStudentAssignListModel } from '../sar-student-assign-model';
import { SarStudentAssignService } from '../sar-student-assign.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-student-assign-list',
  templateUrl: './sar-student-assign-list.component.html',
  styleUrls: ['./sar-student-assign-list.component.scss']
})
export class SarStudentAssignListComponent extends BaseListComponent<SarStudentAssignListModel> implements BaseListInterface {
  tableName:string ='sar_student_assign'
  moduleName:string = 'MODULE.SAR_STUDENT_ASSIGN'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarStudentAssignService,
     router:Router,route:ActivatedRoute,private userDataService:UserDataService
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_student_assign',
        feildName:'schoolyear',
        label:'ประจำปีการศึกษา',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
        value:this.schoolyear,
    },
    ]
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          tableName:'sar_student_assign',
          feildName:'teacherId',
          label:'LABEL.TEACHER_ID',
          inputType:InputType.ENUM,
          operator:Operators.EQUAL,
          enumOption:this.teacherOption,
          value:this.infoId,
          hidden:true
      }
      )
    }else{
      searchConditions.push({
        tableName:'sar_student_assign',
        feildName:'teacherId',
        label:'LABEL.TEACHER_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.teacherOption
  
    } )
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
        tableName: 'sar_student_assign',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.SCHOOLYEAR',
        textKey: 'schoolyear',
        type: ColumnType.STRING,
        tableName: 'sar_student_assign',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'เรื่อง',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'sar_student_assign',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"
      },
      {
        label: 'จำนวนครั้ง',
        textKey: 'timesCount',
        type: ColumnType.STRING,
        tableName: 'sar_student_assign',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'ชื่อแหล่งเรียนรู้',
        textKey: 'sourceName',
        type: ColumnType.STRING,
        tableName: 'sar_student_assign',
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
    this.toItem('sar-student-assign',id,isView)
  }
}
