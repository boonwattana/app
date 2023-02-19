import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarQualityEvidenceListModel } from '../sar-quality-evidence2-model';
import { SarQualityEvidenceService } from '../sar-quality-evidence2.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-quality-evidence2-list',
  templateUrl: './sar-quality-evidence2-list.component.html',
  styleUrls: ['./sar-quality-evidence2-list.component.scss']
})
export class SarQualityEvidenceListComponent extends BaseListComponent<SarQualityEvidenceListModel> implements BaseListInterface {
  tableName:string ='sar_quality_evidence'
  moduleName:string = 'MODULE.SAR_QUALITY_EVIDENCE'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  evidenceTypeOption:SelectItems[] = []
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarQualityEvidenceService,
     router:Router,route:ActivatedRoute, private readonly userDataService:UserDataService
    ) {
    super(router,route);
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_quality_evidence',
        feildName:'schoolyear',
        label:'ประจำปีการศึกษา',
        inputType:InputType.STRING,
        operator:Operators.LIKE,
        value:this.schoolyear,
    },  {
      tableName:'sar_quality_evidence',
      feildName:'standard_type',
      inputType:InputType.STRING,
      operator:Operators.EQUAL,
      value:2,
      hidden:true
  },
    ]
    if(this.userDataService.isTeacher()){
      searchConditions.push(
        {
          tableName:'sar_quality_evidence',
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
        tableName:'sar_quality_evidence',
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
    this.evidenceTypeOption = this.dropdownService.getEvidenceTypeDropdown()
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
        tableName: 'sar_quality_evidence',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      },
      {
        label: 'LABEL.SCHOOLYEAR',
        textKey: 'schoolyear',
        type: ColumnType.STRING,
        tableName: 'sar_quality_evidence',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'หลักฐานร่องรอยที่ดำเนินการ',
        textKey: 'evidenceName',
        type: ColumnType.STRING,
        tableName: 'sar_quality_evidence',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:25%"
      },
      {
        label: 'ผลการดำเนินงาน',
        textKey: 'evidenceType',
        type: ColumnType.ENUM,
        tableName: 'sar_quality_evidence',
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.evidenceTypeOption,
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
    this.toItem('sar-quality-evidence2',id,isView)
  }
}
