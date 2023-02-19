import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { EditRequestListModel } from '../edit-request-model';
import { EditRequestService } from '../edit-request.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'edit-request-list',
  templateUrl: './edit-request-list.component.html',
  styleUrls: ['./edit-request-list.component.scss']
})
export class EditRequestListComponent extends BaseListComponent<EditRequestListModel> implements BaseListInterface {
  tableName:string ='edit_request'
  moduleName:string = 'MODULE.EDIT_REQUEST'
  lastRemoveId:number = undefined;
  editFieldOption:SelectItems[] = []
  statusDropdown:SelectItems[] = []
  userId:number;
  canImport:boolean = false
  constructor(private service: EditRequestService,
     router:Router,route:ActivatedRoute,
     private readonly userDataService:UserDataService,
     private translate: TranslateService
    ) {
    super(router,route);
    this.userType= this.userDataService.getUserType()
    this.userId = this.userDataService.getUserId()
    this.canCreate = this.userDataService.getUserType()!= 'Admin'
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
          tableName:'edit_request',
          feildName:'editFieldId',
          label:'LABEL.EDIT_FIELD_ID',
          inputType:InputType.ENUM,
          operator:Operators.EQUAL,
          enumOption:this.editFieldOption

      },
      
    ]
    if(this.userType=='Student'){
      searchConditions.push({
        tableName: 'edit_request',
        feildName: 'requestId',
        value:this.userId,
        inputType:InputType.NUMBER,
        hidden:true,
        operator:Operators.EQUAL,

      })
    }
    this.searchConditions = searchConditions;
  }
  ngOnInit(): void {
    this.onEnumLoader()
    this.setSerachCondtion()
    this.setDataGridOption()
  }
  onSearch(searchParameter: SearchParameter): void {        
    this.service.getList(searchParameter).subscribe(result=>{ 
      // const result2 =      result.results as EditRequestListModel[]
      if(result){
        this.searchResult = result
        this.searchResult.results = result.results.map(mp=>this.getModel(mp))

      }
    })
  }
  getModel(mp: any) {
    return {...mp,editRequestStatus:this.getEditStatus(mp.editRequestStatus)}
  }
  getEditStatus(editRequestStatus: any) {
    return this.translate.instant(this.statusDropdown.find(fn=>fn.value == editRequestStatus).label) 
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }
  onEnumLoader(): void {
    this.statusDropdown = this.dropdownService.getEditRequestStatusDropdown()
    forkJoin(
    this.service.getEditFieldDropdown(),
    ).subscribe(
      ([
      editFieldOption,
      ]) => {
      [
     this.editFieldOption =editFieldOption  as SelectItems[],
     this.setSerachCondtion()
      ]
      }),
      (error) => {
      }
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: 'LABEL.REQUEST_VALUE',
        textKey: 'requestValue',
        type: ColumnType.STRING,
        tableName: 'edit_request',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      

      },
      {
        label: 'LABEL.EDIT_FIELD_ID',
        textKey: 'editFieldValue',
        type: ColumnType.STRING,
        tableName: 'edit_request',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      

      },
      {
        label: 'LABEL.CHANGE_TO',
        textKey: 'changeTo',
        type: ColumnType.STRING,
        tableName: 'edit_request',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.EDIT_REQUEST_STATUS',
        textKey: 'editRequestStatus',
        type: ColumnType.STRING,
        tableName: 'edit_request',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%",
        enumOption:this.statusDropdown

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
    this.toItem('edit-request',id,isView)
  }
}
