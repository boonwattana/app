import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { ProvinceListModel } from '../province-model';
import { ProvinceService } from '../province.service';
@Component({
  selector: 'province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent extends BaseListComponent<ProvinceListModel> implements BaseListInterface {
  tableName:string ='province'
  moduleName:string = 'MODULE.PROVINCE'
  lastRemoveId:number = undefined;
  countryOption:SelectItems[] = []
  constructor(private service: ProvinceService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      // {
      //     tableName:'province',
      //     feildName:'countryId',
      //     label:'LABEL.COUNTRY_ID',
      //     inputType:InputType.ENUM,
      //     operator:Operators.EQUAL,
      //     enumOption:this.countryOption

      // },
      {
          tableName:'province',
          feildName:'code',
          label:'LABEL.PROVINCE_CODE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'province',
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
    forkJoin(
    this.service.getCountryDropdown(),
    ).subscribe(
      ([
      countryOption,
      ]) => {
      [
     this.countryOption =countryOption  as SelectItems[],
     this.setSerachCondtion()
      ]
      }) 
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.COUNTRY_ID',
        textKey: 'countryValue',
        type: ColumnType.STRING,
        tableName: 'province',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.PROVINCE_CODE',
        textKey: 'code',
        type: ColumnType.STRING,
        tableName: 'province',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"

      },
      {
        label: 'LABEL.NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'province',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"

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
    this.toItem('province',id,isView)
  }
}
