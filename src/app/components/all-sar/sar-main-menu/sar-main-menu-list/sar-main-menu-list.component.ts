import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarMainMenuListModel } from '../sar-main-menu-model';
import { SarMainMenuService } from '../sar-main-menu.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-main-menu-list',
  templateUrl: './sar-main-menu-list.component.html',
  styleUrls: ['./sar-main-menu-list.component.scss']
})
export class SarMainMenuListComponent extends BaseListComponent<SarMainMenuListModel> implements BaseListInterface {
  tableName:string ='sar-main-menu'
  moduleName:string = 'MODULE.SAR'
  lastRemoveId:number = undefined;
  userIdValue:number =this.userDataService.getUserId();
  infoIdValue:string =this.userDataService.getInfoId();
  typeOption:SelectItems[] = []
  constructor(private service: SarMainMenuService,
     router:Router,route:ActivatedRoute,private readonly userDataService:UserDataService,
    ) {
    super(router,route);
  }

  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
  
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
    this.toItem('sar-main-menu',id,isView)
  }
  goToPath(path:string){

    if(this.userDataService.isTeacher()==true || path=='sar-presonal-data'){
      this.router.navigate([path+'/'+this.infoIdValue]);
    }else{
      this.router.navigate([path]);
    }
    
  }
}
