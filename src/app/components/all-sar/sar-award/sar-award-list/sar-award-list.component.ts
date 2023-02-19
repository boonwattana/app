import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarAwardListModel } from '../sar-award-model';
import { SarAwardService } from '../sar-award.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-award-list',
  templateUrl: './sar-award-list.component.html',
  styleUrls: ['./sar-award-list.component.scss']
})
export class SarAwardListComponent extends BaseListComponent<SarAwardListModel> implements BaseListInterface {
  tableName:string ='sar_award'
  moduleName:string = 'MODULE.SAR_AWARD'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarAwardService,
     router:Router,route:ActivatedRoute, private readonly userDataService:UserDataService
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_teaching_format',
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
          tableName:'sar_teaching_format',
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
        tableName:'sar_teaching_format',
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
        tableName: 'sar_award',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.SCHOOLYEAR',
        textKey: 'schoolyear',
        type: ColumnType.STRING,
        tableName: 'sar_award',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      }, {
        label: 'วัน/เดือน/ปี',
        textKey: 'date',
        type: ColumnType.STRING,
        tableName: 'sar_award',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: 'LABEL.รางวัล/เกียรติคุณ',
        textKey: 'awardName',
        type: ColumnType.STRING,
        tableName: 'sar_award',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
     
      {
        label: 'หน่วยงานที่มอบ',
        textKey: 'organization',
        type: ColumnType.STRING,
        tableName: 'sar_award',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
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
    this.toItem('sar-award',id,isView)
  }
}
