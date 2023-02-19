import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { EmotionalQuotientListModel } from '../emotional-quotient-model';
import { EmotionalQuotientService } from '../emotional-quotient.service';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'emotional-quotient-list',
  templateUrl: './emotional-quotient-list.component.html',
  styleUrls: ['./emotional-quotient-list.component.scss']
})
export class EmotionalQuotientListComponent extends BaseListComponent<EmotionalQuotientListModel> implements BaseListInterface {
  tableName:string ='emotional_quotient'
  moduleName:string = 'MODULE.EMOTIONAL_QUOTIENT'
  lastRemoveId:number = undefined;
  classroomOption:SelectItems[] = []
  classroomTypeOption:SelectItems[] = []


  
  constructor(private service: EmotionalQuotientService,
     router:Router,route:ActivatedRoute,private readonly reportService:ReportService,
     private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.reportName = 'EQ'
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
    // if(this.userDataService.isGuid()){
    //   hiddent = false
    // }
    const searchConditions:SearchCondition[] = [
      {
        tableName:'emotional_quotient',
        feildName:'studentValue',
        label:'LABEL.STUDENT_ID',
        inputType:InputType.STRING,
        operator:Operators.LIKE,

    },
      {
        tableName:'emotional_quotient',
        feildName:'classroomTypeId',
        label:'LABEL.CLASSROOM_TYPE_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.classroomTypeOption,
        hidden:hiddent,
        value:classId
    },
    {
      tableName:'emotional_quotient',
      feildName:'classroomId',
      label:'LABEL.CLASSROOM_ID',
      inputType:InputType.ENUM,
      operator:Operators.EQUAL,
      enumOption:this.classroomOption,
      hidden:hiddent,
      value:roomId
    }
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
    forkJoin(
      this.service.getClassroomTypeDropdown(),
      this.service.getClassroomDropdown(),

      ).subscribe(
        ([
        classroomTypeOption,
        classroomOption,
        ]) => {
        [
       this.classroomTypeOption =classroomTypeOption  as SelectItems[],
       this.classroomOption =classroomOption  as SelectItems[],

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
        label: 'LABEL.STUDENT_NUMBER',
        textKey: 'studentNumber',
        type: ColumnType.STRING,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:7%"

      },   
      {
        label: 'LABEL.STUDENT_VALUE',
        textKey: 'studentValue',
        type: ColumnType.STRING,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },   
      {
        label: 'LABEL.CLASSROOM_TYPE_ID',
        textKey: 'typeName',
        type: ColumnType.STRING,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },
      {
        label: 'LABEL.CLASSROOM_ID',
        textKey: 'room',
        type: ColumnType.STRING,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:5%"

      },

      {
        label: 'LABEL.EQ_GOOD',
        textKey: 'eqGood',
        type: ColumnType.EQ_GOOD,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

      },
      {
        label: 'LABEL.EQ_GREET',
        textKey: 'eqGreet',
        type: ColumnType.EQ_GREET,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.EQ_HAPPY',
        textKey: 'eqHappy',
        type: ColumnType.EQ_HAPPY,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.EQ_SUM',
        textKey: 'eqSum',
        type: ColumnType.EQ_SUM,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'LABEL.STATUS',
        textKey: 'updatedAt',
        type: ColumnType.ACTION,
        tableName: 'emotional_quotient',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

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
    this.toItem('emotional-quotient',id,isView)
  }
}
