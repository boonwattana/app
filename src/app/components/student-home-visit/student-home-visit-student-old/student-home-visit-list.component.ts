import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/component/base-list/base-list.component';
import { Operators } from 'src/app/shared/constants/constanst';
import { ColumnType, InputType, SortType } from 'src/app/shared/constants/enum-system';
import { BaseListInterface } from 'src/app/shared/interface/base-list-interface';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from 'src/app/shared/models/miscellaneous';
import { SearchCondition, SearchParameter } from 'src/app/shared/models/search-param-model';
import { StudentHomeVisitListModel } from '../student-home-visit-model';
import { StudentHomeVisitService } from '../student-home-visit.service';
@Component({
  selector: 'student-home-visit-list',
  templateUrl: './student-home-visit-list.component.html',
  styleUrls: ['./student-home-visit-list.component.scss']
})
export class StudentHomeVisitListComponent extends BaseListComponent<StudentHomeVisitListModel> implements BaseListInterface {
  tableName:string ='student_home_visit'
  moduleName:string = 'MODULE.STUDENT_HOME_VISIT'
  lastRemoveId:number = undefined;
  studentOption:SelectItems[] = []
  constructor(private service: StudentHomeVisitService,
     router:Router,route:ActivatedRoute
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
    forkJoin(
    ).subscribe(
      ([
      ]) => {
      [
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
        label: 'LABEL.HOME_VISITDAY',
        textKey: 'homeVisitday',
        type: ColumnType.DATE,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"
      },
      {
        label: 'LABEL.AT_SEMESTER',
        textKey: 'atSemester',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
        width:"width:20%"

      },
      {
        label: 'LABEL.AT_YEAR',
        textKey: 'atYear',
        type: ColumnType.STRING,
        tableName: 'student_home_visit',
        visibility: true,
        sorting: SortType.NONE,
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
    this.toItem('student-home-visit',id,isView)
  }
}
