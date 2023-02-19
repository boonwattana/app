import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarIntegratedLearningListModel } from '../sar-integrated-learning-model';
import { SarIntegratedLearningService } from '../sar-integrated-learning.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-integrated-learning-list',
  templateUrl: './sar-integrated-learning-list.component.html',
  styleUrls: ['./sar-integrated-learning-list.component.scss']
})
export class SarIntegratedLearningListComponent extends BaseListComponent<SarIntegratedLearningListModel> implements BaseListInterface {
  tableName:string ='sar_integrated_learning'
  moduleName:string = 'MODULE.SAR_INTEGRATED_LEARNING'
  lastRemoveId:number = undefined;
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  teacherOption:SelectItems[] = []
  constructor(private service: SarIntegratedLearningService,
     router:Router,route:ActivatedRoute,private userDataService:UserDataService
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_integrated_learning',
        feildName:'schoolyear',
        label:'ประจำปีการศึกษา',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
        value:this.schoolyear,
    },
    ]
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          tableName:'sar_integrated_learning',
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
        tableName:'sar_integrated_learning',
        feildName:'teacherId',
        label:'LABEL.TEACHER_ID',
        inputType:InputType.ENUM,
        operator:Operators.EQUAL,
        enumOption:this.teacherOption

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
    forkJoin(
    this.service.getTeacherDropdown(),
    ).subscribe(
      ([
      teacherOption,
      ]) => {
      [
     this.teacherOption =teacherOption  as SelectItems[],
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
        label: 'LABEL.TEACHER_ID',
        textKey: 'teacherValue',
        type: ColumnType.STRING,
        tableName: 'sar_integrated_learning',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.SCHOOLYEAR',
        textKey: 'schoolyear',
        type: ColumnType.STRING,
        tableName: 'sar_integrated_learning',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      },{
        label: 'หน่วยที่/ผลการเรียนรู้',
        textKey: 'mediaProductionUnit',
        type: ColumnType.STRING,
        tableName: 'sar_integrated_learning',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },{
        label: 'เรื่อง',
        textKey: 'mediaProductionName',
        type: ColumnType.STRING,
        tableName: 'sar_integrated_learning',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'จำนวนชั่วโมง',
        textKey: 'hourCount',
        type: ColumnType.STRING,
        tableName: 'sar_integrated_learning',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"

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
    this.toItem('sar-integrated-learning',id,isView)
  }
}
