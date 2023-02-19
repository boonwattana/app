import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { EditFieldListModel } from '../edit-field-model';
import { EditFieldService } from '../edit-field.service';
@Component({
  selector: 'edit-field-list',
  templateUrl: './edit-field-list.component.html',
  styleUrls: ['./edit-field-list.component.scss']
})
export class EditFieldListComponent extends BaseListComponent<EditFieldListModel> implements BaseListInterface {
  tableName:string ='edit_field'
  moduleName:string = 'MODULE.EDIT_FIELD'
  lastRemoveId:number = undefined;
  constructor(private service: EditFieldService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'edit_field',
          feildName:'editFieldName',
          label:'LABEL.EDIT_FIELD_NAME',
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
        label: 'LABEL.EDIT_FIELD_NAME',
        textKey: 'editFieldName',
        type: ColumnType.STRING,
        tableName: 'edit_field',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:40%"

      },
      {
        label: 'LABEL.EDIT_FIELD_DESCRIPTION',
        textKey: 'editFieldDescription',
        type: ColumnType.STRING,
        tableName: 'edit_field',
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
    this.toItem('edit-field',id,isView)
  }
}
