import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { DistrictListModel } from '../district-model';
import { DistrictService } from '../district.service';
@Component({
  selector: 'district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent extends BaseListComponent<DistrictListModel> implements BaseListInterface {
  tableName:string ='district'
  moduleName:string = 'MODULE.DISTRICT'
  lastRemoveId:number = undefined;
  provinceOption:SelectItems[] = []
  constructor(private service: DistrictService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      // {
      //     tableName:'district',
      //     feildName:'provinceId',
      //     label:'LABEL.PROVINCE_ID',
      //     inputType:InputType.ENUM,
      //     operator:Operators.EQUAL,
      //     enumOption:this.provinceOption

      // },
      {
          tableName:'district',
          feildName:'code',
          label:'LABEL.DISTRICT_CODE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'district',
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
    this.service.getProvinceDropdown(),
    ).subscribe(
      ([
      provinceOption,
      ]) => {
      [
     this.provinceOption =provinceOption  as SelectItems[],
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
        label: 'LABEL.PROVINCE_ID',
        textKey: 'provinceValue',
        type: ColumnType.STRING,
        tableName: 'district',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.DISTRICT_CODE',
        textKey: 'code',
        type: ColumnType.STRING,
        tableName: 'district',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"

      },
      {
        label: 'LABEL.NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'district',
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
    this.toItem('district',id,isView)
  }
}
