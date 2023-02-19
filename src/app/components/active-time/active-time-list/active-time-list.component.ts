import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { ActiveTimeListModel } from '../active-time-model';
import { ActiveTimeService } from '../active-time.service';
@Component({
  selector: 'active-time-list',
  templateUrl: './active-time-list.component.html',
  styleUrls: ['./active-time-list.component.scss']
})
export class ActiveTimeListComponent extends BaseListComponent<ActiveTimeListModel> implements BaseListInterface {
  tableName:string ='active_time'
  moduleName:string = 'MODULE.ACTIVE_TIME'
  lastRemoveId:number = undefined;
  constructor(private service: ActiveTimeService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'active_time',
          feildName:'activeStart',
          label:'LABEL.ACTIVE_START',
          inputType:InputType.DATE,
          operator:Operators.LIKE,

      },
      {
          tableName:'active_time',
          feildName:'activeEnd',
          label:'LABEL.ACTIVE_END',
          inputType:InputType.DATE,
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
        label: 'LABEL.ACTIVE_START',
        textKey: 'activeStart',
        type: ColumnType.DATE,
        tableName: 'active_time',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.ACTIVE_END',
        textKey: 'activeEnd',
        type: ColumnType.DATE,
        tableName: 'active_time',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.DESCRIPTION',
        textKey: 'description',
        type: ColumnType.STRING,
        tableName: 'active_time',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.REMARK',
        textKey: 'remark',
        type: ColumnType.STRING,
        tableName: 'active_time',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

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
    this.toItem('active-time',id,isView)
  }
}
