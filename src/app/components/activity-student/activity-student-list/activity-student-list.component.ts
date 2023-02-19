import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { ActivityStudentListModel } from '../activity-student-model';
import { ActivityStudentService } from '../activity-student.service';
@Component({
  selector: 'activity-student-list',
  templateUrl: './activity-student-list.component.html',
  styleUrls: ['./activity-student-list.component.scss']
})
export class ActivityStudentListComponent extends BaseListComponent<ActivityStudentListModel> implements BaseListInterface {
  tableName:string ='activity_student'
  moduleName:string = 'MODULE.ACTIVITY_STUDENT'
  lastRemoveId:number = undefined;
  constructor(private service: ActivityStudentService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'activity_student',
          feildName:'activityMainName',
          label:'LABEL.ACTIVITY_MAIN_NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

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
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.ACTIVITY_MAIN_NAME',
        textKey: 'activityMainName',
        type: ColumnType.STRING,
        tableName: 'activity_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"

      },
      {
        label: 'LABEL.ACTIVITY_SUB_NAME',
        textKey: 'activitySubName',
        type: ColumnType.STRING,
        tableName: 'activity_student',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:50%"

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
    this.toItem('activity-student',id,isView)
  }
}
