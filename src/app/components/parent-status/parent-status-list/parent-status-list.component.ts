import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { ParentStatusListModel } from '../parent-status-model';
import { ParentStatusService } from '../parent-status.service';
@Component({
  selector: 'parent-status-list',
  templateUrl: './parent-status-list.component.html',
  styleUrls: ['./parent-status-list.component.scss']
})
export class ParentStatusListComponent extends BaseListComponent<ParentStatusListModel> implements BaseListInterface {
  tableName:string ='parent_status'
  moduleName:string = 'MODULE.PARENT_STATUS'
  lastRemoveId:number = undefined;
  constructor(private service: ParentStatusService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'parent_status',
          feildName:'parentStatusName',
          label:'LABEL.PARENT_STATUS_NAME',
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
        label: 'LABEL.PARENT_STATUS_NAME',
        textKey: 'parentStatusName',
        type: ColumnType.STRING,
        tableName: 'parent_status',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.PARENT_STATUS_DESCRIPTION',
        textKey: 'parentStatusDescription',
        type: ColumnType.STRING,
        tableName: 'parent_status',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

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
    this.toItem('parent-status',id,isView)
  }
}
