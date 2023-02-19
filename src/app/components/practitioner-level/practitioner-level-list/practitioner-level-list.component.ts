import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { PractitionerLevelListModel } from '../practitioner-level-model';
import { PractitionerLevelService } from '../practitioner-level.service';
@Component({
  selector: 'practitioner-level-list',
  templateUrl: './practitioner-level-list.component.html',
  styleUrls: ['./practitioner-level-list.component.scss']
})
export class PractitionerLevelListComponent extends BaseListComponent<PractitionerLevelListModel> implements BaseListInterface {
  tableName:string ='practitioner_level'
  moduleName:string = 'MODULE.PRACTITIONER_LEVEL'
  lastRemoveId:number = undefined;
  constructor(private service: PractitionerLevelService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'practitioner_level',
          feildName:'levelName',
          label:'LABEL.LEVEL_NAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'practitioner_level',
          feildName:'levelDescription',
          label:'LABEL.LEVEL_DESCRIPTION',
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
        label: 'LABEL.LEVEL_NAME',
        textKey: 'levelName',
        type: ColumnType.STRING,
        tableName: 'practitioner_level',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:30%"
      },
      {
        label: 'LABEL.LEVEL_DESCRIPTION',
        textKey: 'levelDescription',
        type: ColumnType.STRING,
        tableName: 'practitioner_level',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:50%"
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
    this.toItem('practitioner-level',id,isView)
  }
}
