import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { YearTermListModel } from '../year-term-model';
import { YearTermService } from '../year-term.service';
@Component({
  selector: 'year-term-list',
  templateUrl: './year-term-list.component.html',
  styleUrls: ['./year-term-list.component.scss']
})
export class YearTermListComponent extends BaseListComponent<YearTermListModel> implements BaseListInterface {
  tableName:string ='year_term'
  moduleName:string = 'MODULE.YEAR_TERM'
  lastRemoveId:number = undefined;
  constructor(private service: YearTermService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'year_term',
          feildName:'year',
          label:'LABEL.YEAR_TERM',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'year_term',
          feildName:'term',
          label:'LABEL.TERM',
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
        label: 'LABEL.YEAR_TERM',
        textKey: 'year',
        type: ColumnType.STRING,
        tableName: 'year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.TERM',
        textKey: 'term',
        type: ColumnType.STRING,
        tableName: 'year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

      },
      {
        label: 'LABEL.IS_PARENT',
        textKey: 'isParent',
        type: ColumnType.BOOLEAN,
        tableName: 'year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"

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
    this.toItem('year-term',id,isView)
  }
}
