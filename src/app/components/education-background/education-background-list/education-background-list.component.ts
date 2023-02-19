import { Component } from "@angular/core";
import { forkJoin } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseListComponent } from "src/app/shared/component/base-list/base-list.component";
import { Operators } from "src/app/shared/constants/constanst";
import {
  ColumnType,
  InputType,
  SortType,
} from "src/app/shared/constants/enum-system";
import { BaseListInterface } from "src/app/shared/interface/base-list-interface";
import {
  ColumnModel,
  OptionModel,
  RowIdentity,
  SelectItems,
} from "src/app/shared/models/miscellaneous";
import {
  SearchCondition,
  SearchParameter,
} from "src/app/shared/models/search-param-model";
import { EducationBackgroundListModel } from "../education-background-model";
import { EducationBackgroundService } from "../education-background.service";
import { UserDataService } from "src/app/shared/services/user-data.service";
@Component({
  selector: "education-background-list",
  templateUrl: "./education-background-list.component.html",
  styleUrls: ["./education-background-list.component.scss"],
})
export class EducationBackgroundListComponent
  extends BaseListComponent<EducationBackgroundListModel>
  implements BaseListInterface
{
  tableName: string = "education_background";
  moduleName: string = "MODULE.EDUCATION_BACKGROUND";
  lastRemoveId: number = undefined;
  teacherOption: SelectItems[] = [];
  educationOption: SelectItems[] = [];
  constructor(
    private service: EducationBackgroundService,
    router: Router,
    route: ActivatedRoute,
    private userDataService: UserDataService
  ) {
    super(router, route);
    this.infoId = this.userDataService.getInfoId();
  }
  setSerachCondtion(): void {
    const searchConditions: SearchCondition[] = [];
    if (this.userDataService.isAdmin()) {
      searchConditions.push({
        tableName: "education_background",
        feildName: "teacherId",
        label: "LABEL.TEACHER_ID",
        inputType: InputType.ENUM,
        operator: Operators.EQUAL,
        hidden: !this.userDataService.isAdmin(),
        enumOption: this.teacherOption,
      });
    }
    searchConditions.push({
      tableName: "education_background",
      feildName: "educationId",
      label: "LABEL.EDUCATION_ID",
      inputType: InputType.ENUM,
      operator: Operators.EQUAL,
      enumOption: this.educationOption,
    });
    searchConditions.push({
      tableName: "education_background",
      feildName: "educationShotNameEn",
      label: "LABEL.EDUCATION_SHOT_NAME_EN",
      inputType: InputType.STRING,
      operator: Operators.LIKE,
    });
    if (this.userDataService.isTeacher()) {
      searchConditions.push({
        inputType: InputType.NUMBER,
        hidden: true,
        tableName: "teachers_develop",
        feildName: "teacherId",
        label: "LABEL.LASTNAME",
        operator: Operators.EQUAL,
        value: this.infoId,
      });
    }
    this.searchConditions = searchConditions;
  }
  ngOnInit(): void {
    this.onEnumLoader();
    this.setSerachCondtion();
    this.setDataGridOption();
  }
  onSearch(searchParameter: SearchParameter): void {
    this.service.getList(searchParameter).subscribe((result) => {
      this.searchResult = result;
    });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  onEnumLoader(): void {
    this.educationOption = this.dropdownService.getEducationDropdown();
    forkJoin(this.service.getTeacherDropdown()).subscribe(([teacherOption]) => {
      [
        (this.teacherOption = teacherOption as SelectItems[]),
        this.setSerachCondtion(),
      ];
    }),
      (error) => {};
  }
  setDataGridOption(): void {
    this.option = new OptionModel();
    this.option.canCreate = true;
    this.option.canView = true;
    this.option.canDelete = true;
    const columns: ColumnModel[] = [
      {
        label: "LABEL.TEACHER_ID",
        textKey: "teacherValue",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:20%",
      },
      {
        label: "LABEL.EDUCATION_ID",
        textKey: "educationId",
        type: ColumnType.ENUM,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        enumOption: this.educationOption,
        width: "width:10%",
      },
      {
        label: "LABEL.EDUCATION_MAJOR",
        textKey: "educationMajor",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%",
      },
      {
        label: "LABEL.EDUCATION_SHOT_NAME_TH",
        textKey: "educationShotNameTh",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%",
      },
      {
        label: "LABEL.EDUCATION_SHOT_NAME_EN",
        textKey: "educationShotNameEn",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%",
      },
      {
        label: "LABEL.EDUCATION_YEAR",
        textKey: "educationYear",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%",
      },
      {
        label: "LABEL.INSTITUTION_NAME",
        textKey: "institutionName",
        type: ColumnType.STRING,
        tableName: "education_background",
        visibility: true,
        sorting: SortType.NONE,
        width: "width:10%",
      },
    ];
    this.option.columns = columns;
  }
  onCreate(): void {
    this.toItemPage(0, false);
  }
  onView(row: RowIdentity): void {
    this.toItemPage(row.id, true);
  }
  onEdit(row: RowIdentity): void {
    this.toItemPage(row.id, false);
  }
  onDelete(row: RowIdentity): void {
    this.service.delete(row.id).subscribe((result) => {
      this.lastRemoveId = result.id;
    });
  }
  toItemPage(id: number, isView: boolean) {
    this.toItem("education-background", id, isView);
  }
}
