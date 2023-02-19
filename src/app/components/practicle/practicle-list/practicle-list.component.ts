import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { PracticleListModel } from '../practicle-model';
import { PracticleService } from '../practicle.service';
@Component({
  selector: 'practicle-list',
  templateUrl: './practicle-list.component.html',
  styleUrls: ['./practicle-list.component.scss']
})
export class PracticleListComponent extends BaseListComponent<PracticleListModel> implements BaseListInterface {
  tableName:string ='practicle'
  moduleName:string = 'MODULE.PRACTICLE'
  lastRemoveId:number = undefined;
  constructor(private service: PracticleService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'practicle',
          feildName:'name',
          label:'LABEL.NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'practicle',
          feildName:'descrition',
          label:'LABEL.DESCRIPTION',
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
        label: 'LABEL.NAME',
        textKey: 'name',
        type: ColumnType.STRING,
        tableName: 'practicle',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"
        

      },
      {
        label: 'LABEL.DESCRIPTION',
        textKey: 'descrition',
        type: ColumnType.STRING,
        tableName: 'practicle',
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
    this.toItem('practicle',id,isView)
  }
}
