import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SdqTableListModel } from '../sdq-table-model';
import { SdqTableService } from '../sdq-table.service';
@Component({
  selector: 'sdq-table-list',
  templateUrl: './sdq-table-list.component.html',
  styleUrls: ['./sdq-table-list.component.scss']
})
export class SdqTableListComponent extends BaseListComponent<SdqTableListModel> implements BaseListInterface {
  tableName:string ='sdq_table'
  moduleName:string = 'MODULE.SDQ_TABLE'
  lastRemoveId:number = undefined;
  classroomDropdown:SelectItems[] = []
  classroomTypeDropdown:SelectItems[] = []
  statusOption:SelectItems[] = []
  constructor(private service: SdqTableService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
    this.reportName = 'CHECK_STUDENT'
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sdq_table',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeDropdown
    },
    {
      tableName:'sdq_table',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomDropdown
  },
  
    ]
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
    this.option.canCreate = false;
    this.option.canView = true;
    this.option.canDelete = false;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },
      {
        label: 'LABEL.STUDENT_NAME',
        textKey: 'nameValue',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },
      {
        label: 'ขั้น',
        textKey: 'classroomValue',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      
      {
        label: '1.ด้านอารมณ์',
        //label: 'ด้านที่1 (พฤติกรรมด้านอารมณ์)',
        textKey: 'emotionalBehaviorScore01_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '2.ด้านความประพฤติ',
        //label: 'พฤติกรรมเกเร',
        textKey: 'nomalBehaviorScore02_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '3.ไม่อยู่นิ่ง',
        //label: 'พฤติกรรมสมาธิสั้น',
        textKey: 'ADHDBehaviorScore03_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '4.สัมพันธ์เพื่อน',
        //label: 'พฤติกรรมด้านความสัมพันธ์กับเพื่อน',
        textKey: 'friendBehaviorScore04_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },
      {
        label: '5.ทางสังคม',
        //label: 'พฤติกรรมด้านสัมพันธภาพทางสังคม',
        textKey: 'socialBehaviorScore05_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:8%"

      },
      {
        label: 'รวม4ด้าน',
        textKey: 'sumScore_value_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      }
      ,
      {
        label: 'สถานะ',
        textKey: 'status_display',
        type: ColumnType.STRING,
        tableName: 'sdq_table',
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
    this.toItem('sdq-table',id,isView)
  }
}
