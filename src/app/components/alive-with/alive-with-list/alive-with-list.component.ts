import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { AliveWithListModel } from '../alive-with-model';
import { AliveWithService } from '../alive-with.service';
@Component({
  selector: 'alive-with-list',
  templateUrl: './alive-with-list.component.html',
  styleUrls: ['./alive-with-list.component.scss']
})
export class AliveWithListComponent extends BaseListComponent<AliveWithListModel> implements BaseListInterface {
  tableName:string ='alive_with'
  moduleName:string = 'MODULE.ALIVE_WITH'
  lastRemoveId:number = undefined;
  constructor(private service: AliveWithService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'alive_with',
          feildName:'aliveWithName',
          label:'LABEL.ALIVE_WITH_NAME',
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
        label: 'LABEL.ALIVE_WITH_NAME',
        textKey: 'aliveWithName',
        type: ColumnType.STRING,
        tableName: 'alive_with',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.ALIVE_WITH_DESCRIPTION',
        textKey: 'aliveWithDescription',
        type: ColumnType.STRING,
        tableName: 'alive_with',
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
    this.toItem('alive-with',id,isView)
  }
}
