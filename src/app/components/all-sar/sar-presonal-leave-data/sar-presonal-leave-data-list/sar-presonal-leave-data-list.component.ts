import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarPresonalLeaveDataListModel } from '../sar-presonal-leave-data-model';
import { SarPresonalLeaveDataService } from '../sar-presonal-leave-data.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-presonal-leave-data-list',
  templateUrl: './sar-presonal-leave-data-list.component.html',
  styleUrls: ['./sar-presonal-leave-data-list.component.scss']
})
export class SarPresonalLeaveDataListComponent extends BaseListComponent<SarPresonalLeaveDataListModel> implements BaseListInterface {
  tableName:string ='sar_presonal_leave_data'
  moduleName:string = 'MODULE.SAR_PRESONAL_LEAVE_DATA'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = [];
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarPresonalLeaveDataService,
     router:Router,route:ActivatedRoute, private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
  }
  
  setSerachCondtion(): void {

    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_presonal_leave_data',
        feildName:'schoolYear',
        label:'ประจำปีการศึกษา',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
        value:this.schoolyear,
    },
    ]
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          tableName:'sar_presonal_leave_data',
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
        tableName:'sar_presonal_leave_data',
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
 ;
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
        label: 'ชื่อสกุล',
        textKey: 'teacherValue',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'ปีการศึกษา',
        textKey: 'schoolYear',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'วัน เดือน ปี ที่ลา',
        textKey: 'leaveDate',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:17%"

      },
      
      {
        label: 'ลาป่วย',
        textKey: 'sickLeaveTimes',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      
      {
        label: 'ลากิจ',
        textKey: 'businessLeaveTimes',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      
      {
        label: 'ลาอุปสมบท',
        textKey: 'ordinationLeaveTimes',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      
      {
        label: 'ลาคลอด',
        textKey: 'deliverLeaveTimes',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'มาสาย',
        textKey: 'lateTimes',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_leave_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

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
    this.toItem('sar-presonal-leave-data',id,isView)
  }
}
