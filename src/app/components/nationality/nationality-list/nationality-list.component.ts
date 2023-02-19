import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { NationalityListModel } from '../nationality-model';
import { NationalityService } from '../nationality.service';
@Component({
  selector: 'nationality-list',
  templateUrl: './nationality-list.component.html',
  styleUrls: ['./nationality-list.component.scss']
})
export class NationalityListComponent extends BaseListComponent<NationalityListModel> implements BaseListInterface {
  tableName:string ='nationality'
  moduleName:string = 'MODULE.NATIONALITY'
  lastRemoveId:number = undefined;
  constructor(private service: NationalityService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'nationality',
          feildName:'nationalityName',
          label:'LABEL.NATIONALITY_NAME',
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
        label: 'LABEL.NATIONALITY_NAME',
        textKey: 'nationalityName',
        type: ColumnType.STRING,
        tableName: 'nationality',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.NATIONALITY_DESCRIPTION',
        textKey: 'nationalityDescription',
        type: ColumnType.STRING,
        tableName: 'nationality',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.REMARK',
        textKey: 'remark',
        type: ColumnType.STRING,
        tableName: 'nationality',
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
    this.toItem('nationality',id,isView)
  }
}
