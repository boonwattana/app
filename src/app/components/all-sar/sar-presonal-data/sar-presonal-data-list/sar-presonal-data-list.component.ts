import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarPresonalDataListModel } from '../sar-presonal-data-model';
import { SarPresonalDataService } from '../sar-presonal-data.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-presonal-data-list',
  templateUrl: './sar-presonal-data-list.component.html',
  styleUrls: ['./sar-presonal-data-list.component.scss']
})
export class SarPresonalDataListComponent extends BaseListComponent<SarPresonalDataListModel> implements BaseListInterface {
  tableName:string ='sar_presonal_data'
  moduleName:string = 'MODULE.SAR_PRESONAL_DATA'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarPresonalDataService,
     router:Router,route:ActivatedRoute, private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
        {
          tableName:'sar_presonal_data',
          feildName:'schoolYear',
          label:'ประจำปีการศึกษา',
          inputType:InputType.STRING,
          operator:Operators.LIKE,
          value:this.schoolyear,
      },
      ]
      if(this.userDataService.isTeacher()){
        searchConditions.push(
          {
            tableName:'sar_presonal_data',
            feildName:'teacherId',
            label:'LABEL.TEACHER_ID',
            inputType:InputType.ENUM,
            operator:Operators.EQUAL,
            enumOption:this.teacherOption,
            value:this.infoId,
            hidden:true
        }
        )
      }else{
        searchConditions.push({
          tableName:'sar_presonal_data',
          feildName:'teacherValue',
          label:'LABEL.TEACHER_ID',
          inputType:InputType.STRING,
          operator:Operators.LIKE,
  
      } )
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
        label: 'ชื่อสกุล',
        textKey: 'teacherValue',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_data',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:45%"

      },
      {
        label: 'ปีการศึกษา',
        textKey: 'schoolYear',
        type: ColumnType.STRING,
        tableName: 'sar_presonal_data',
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
    this.toItem('sar-presonal-data',id,isView)
  }
}
