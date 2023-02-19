import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { CountryListModel } from '../country-model';
import { CountryService } from '../country.service';
@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends BaseListComponent<CountryListModel> implements BaseListInterface {
  tableName:string ='country'
  moduleName:string = 'MODULE.COUNTRY'
  lastRemoveId:number = undefined;
  constructor(private service: CountryService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'country',
          feildName:'code',
          label:'LABEL.COUNTRY_CODE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'country',
          feildName:'name',
          label:'LABEL.NAME',
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
        label: 'LABEL.COUNTRY_CODE',
        textKey: 'code',
        type: ColumnType.STRING,
        tableName: 'country',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'country',
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
    this.toItem('country',id,isView)
  }
}
