import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { SarCoursesYearTermListModel } from '../sar-courses-year-term-model';
import { SarCoursesYearTermService } from '../sar-courses-year-term.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-courses-year-term-list',
  templateUrl: './sar-courses-year-term-list.component.html',
  styleUrls: ['./sar-courses-year-term-list.component.scss']
})
export class SarCoursesYearTermListComponent extends BaseListComponent<SarCoursesYearTermListModel> implements BaseListInterface {
  tableName:string ='sar_courses_year_term'
  moduleName:string = 'MODULE.SAR_COURSES_YEAR_TERM'
  lastRemoveId:number = undefined;
  teacherOption:SelectItems[] = []
  yearTermOption:SelectItems[] = []
  be:number =new Date().getFullYear()+543;
  schoolyear= this.be.toString();
  constructor(private service: SarCoursesYearTermService,
     router:Router,route:ActivatedRoute, private readonly userDataService:UserDataService
    ) {
    super(router,route);
    this.infoId = this.userDataService.getInfoId()
  }
  setSerachCondtion(): void {
    const searchConditions:SearchCondition[] = [
      {
        tableName:'sar_courses_year_term',
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
          tableName:'sar_courses_year_term',
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
        tableName:'sar_courses_year_term',
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
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"

      }, {
        label: 'เทอม/ปีการศึกษา',
        textKey: 'yearTermValue',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:15%"
      },
      {
        label: '"ชื่อวิชา/กิจกรรม',
        textKey: 'subjectName',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'รหัสวิชา',
        textKey: 'subjectCode',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'ระดับชั้น',
        textKey: 'class',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'จำนวนห้อง',
        textKey: 'totalRoom',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:10%"
      },
      {
        label: 'จำนวนชั่วโมง/สัปดาห์',
        textKey: 'hourPerWeek',
        type: ColumnType.STRING,
        tableName: 'sar_courses_year_term',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:13%"
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
    this.toItem('sar-courses-year-term',id,isView)
  }
}
