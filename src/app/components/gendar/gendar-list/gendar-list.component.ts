import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { GendarListModel } from '../gendar-model';
import { GendarService } from '../gendar.service';
@Component({
  selector: 'gendar-list',
  templateUrl: './gendar-list.component.html',
  styleUrls: ['./gendar-list.component.scss']
})
export class GendarListComponent extends BaseListComponent<GendarListModel> implements BaseListInterface {
  tableName:string ='gendar'
  moduleName:string = 'MODULE.GENDAR'
  lastRemoveId:number = undefined;
  constructor(private service: GendarService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'gendar',
          feildName:'gendarName',
          label:'LABEL.GENDAR_NAME',
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
        label: 'LABEL.GENDAR_NAME',
        textKey: 'gendarName',
        type: ColumnType.STRING,
        tableName: 'gendar',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.GENDAR_DESCRIPTION',
        textKey: 'gendarDescription',
        type: ColumnType.STRING,
        tableName: 'gendar',
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
    this.toItem('gendar',id,isView)
  }
}
