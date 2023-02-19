import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { UsersListModel } from '../users-model';
import { UsersService } from '../users.service';
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseListComponent<UsersListModel> implements BaseListInterface {
  tableName:string ='users'
  moduleName:string = 'MODULE.USERS'
  lastRemoveId:number = undefined;
  typeOption:SelectItems[] = []
  constructor(private service: UsersService,
     router:Router,route:ActivatedRoute
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'users',
          feildName:'username',
          label:'LABEL.USERNAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'users',
          feildName:'firstname',
          label:'LABEL.FIRSTNAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
          tableName:'users',
          feildName:'lastname',
          label:'LABEL.LASTNAME',
          inputType:InputType.STRING,
          operator:Operators.LIKE,

      },
      {
        tableName:'users',
        feildName:'type',
        label:'LABEL.TYPE',
        inputType:InputType.ENUM,
        operator:Operators.LIKE,
        enumOption:this.typeOption


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
    this.typeOption = this.dropdownService.getTypeDropdown()
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.USERNAME',
        textKey: 'username',
        type: ColumnType.STRING,
        tableName: 'users',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.FIRSTNAME',
        textKey: 'firstname',
        type: ColumnType.STRING,
        tableName: 'users',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.LASTNAME',
        textKey: 'lastname',
        type: ColumnType.STRING,
        tableName: 'users',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.TYPE',
        textKey: 'type',
        type: ColumnType.ENUM,
        tableName: 'users',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.typeOption,
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
    this.toItem('users',id,isView)
  }
}
