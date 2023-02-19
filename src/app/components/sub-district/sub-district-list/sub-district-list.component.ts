import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SubDistrictListModel } from '../sub-district-model';
import { SubDistrictService } from '../sub-district.service';
@Component({
  selector: 'sub-district-list',
  templateUrl: './sub-district-list.component.html',
  styleUrls: ['./sub-district-list.component.scss']
})
export class SubDistrictListComponent extends BaseListComponent<SubDistrictListModel> implements BaseListInterface {
  tableName:string ='sub_district'
  moduleName:string = 'MODULE.SUB_DISTRICT'
  lastRemoveId:number = undefined;
  districtOption:SelectItems[] = []
  constructor(private service: SubDistrictService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      // {
      //     tableName:'sub_district',
      //     feildName:'districtId',
      //     label:'LABEL.DISTRICT_ID',
      //     inputType:InputType.ENUM,
      //     operator:Operators.EQUAL,
      //     enumOption:this.districtOption

      // },
      {
          tableName:'sub_district',
          feildName:'code',
          label:'LABEL.SUB_DISTRICT_CODE',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'sub_district',
          feildName:'name',
          label:'LABEL.NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'sub_district',
          feildName:'postCode',
          label:'LABEL.POST_CODE',
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
    this.service.getDistrictDropdown(),
    ).subscribe(
      ([
      districtOption,
      ]) => {
      [
     this.districtOption =districtOption  as SelectItems[],
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
        label: 'LABEL.DISTRICT_ID',
        textKey: 'districtValue',
        type: ColumnType.STRING,
        tableName: 'sub_district',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.SUB_DISTRICT_CODE',
        textKey: 'code',
        type: ColumnType.STRING,
        tableName: 'sub_district',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'sub_district',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.POST_CODE',
        textKey: 'postCode',
        type: ColumnType.STRING,
        tableName: 'sub_district',
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
    this.toItem('sub-district',id,isView)
  }
}
