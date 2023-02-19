import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { TeachingScheduleListModel } from '../teaching-schedule-model';
import { TeachingScheduleService } from '../teaching-schedule.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'teaching-schedule-list',
  templateUrl: './teaching-schedule-list.component.html',
  styleUrls: ['./teaching-schedule-list.component.scss']
})
export class TeachingScheduleListComponent extends BaseListComponent<TeachingScheduleListModel> implements BaseListInterface {
  tableName:string ='teacher'
  moduleName:string = 'MODULE.TEACHING_SCHEDULE'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  yearTermOption:SelectItems[] = []
  practitionerLevelOption:SelectItems[] = []
  constructor(private service: TeachingScheduleService,
    private userDataService:UserDataService,
    
     router:Router,route:ActivatedRoute
    ) {
      super(router,route);
    this.infoId = this.userDataService.getInfoId()
    this.canCreate = this.userDataService.isAdmin()
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
    this.service.getPractitionerLevelDropdown(),
    ).subscribe(
      ([
      practitionerLevelOption
      ]) => {
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
      {
        label: 'LABEL.POSITION_NAME',
        textKey: 'positionName',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:16%"
      },
      {
        label: 'LABEL.PRACTITIONER_LEVEL_ID',
        textKey: 'practitionerLevelValue',
        type: ColumnType.STRING,
        tableName: 'teacher',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:16%"
      },
      {
        label: 'LABEL.SUBJECT_GROUP_ID',
        textKey: 'subjectGroupValue',
        type: ColumnType.STRING,
        tableName: 'teacher',
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
    this.toItem('teaching-schedule',id,isView)
  }
}
