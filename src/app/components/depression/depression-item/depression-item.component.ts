import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { forkJoin } from "rxjs";
import { SelectItems } from "src/app/shared/models/miscellaneous";
import { BaseItemComponent } from "src/app/shared/component/base-item/base-item.component";
import { BaseItemInterface } from "src/app/shared/interface/base-item-interface";
import { DepressionItemModel } from "../depression-model";
import { DepressionService } from "../depression.service";
import { UserDataService } from "src/app/shared/services/user-data.service";

@Component({
  selector: "depression-item",
  templateUrl: "./depression-item.component.html",
  styleUrls: ["./depression-item.component.scss"],
})
export class DepressionItemComponent
  extends BaseItemComponent<DepressionItemModel>
  implements BaseItemInterface
{
  isStudent = false;
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private readonly service: DepressionService,
    router: Router,
    route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly userDataService: UserDataService
  ) {
    super(el, renderer, router, route);
    this.isStudent = this.userDataService.getUserType() == "Student";
  }
  studentDropdown: SelectItems[] = [];
  yearTermDropdown: SelectItems[] = [];
  show9q: boolean = false;
  show8q: boolean = false;
  formValidate: boolean = true;
  complete: boolean = false;

  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    if (this.isUpdateMode) {
      this.getById();
    } else {
      this.setInitialCreatingData();
    }
    this.onAsyncRunner();
  }

  onEnumLoader(): void {}
  getById(): void {
    this.complete = true || this.view;

    this.service.getItem(this.id).subscribe((result) => {
      if (result) {
        this.model = result;
        this.complete = result.isUpdateMode && this.view;
        this.isUpdateMode = result.isUpdateMode;
        this.modelChange(1);
      }
      this.onAsyncRunner(result);
    });
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader();

    forkJoin(
      this.service.getStudentDropdown(),
      this.service.getYearTermDropdown()
    ).subscribe(([studentDropdown, yearTermDropdown]) => {
      [
        (this.studentDropdown = studentDropdown as SelectItems[]),
        (this.yearTermDropdown = yearTermDropdown as SelectItems[]),
      ];
    }),
      (error) => {};
  }
  async setInitialCreatingData() {
    if (this.view) {
      this.complete = false;
    }
    this.service.initial().subscribe((result) => {
      this.model = result;
    });
  }
  onSave(): void {
    this.onSubmit(this.customValidate());
  }
  customValidate() {
    const fieldList1 = ["depressionCh1", "depressionCh2"];
    const fieldList2 = [
      "depressionCh3",
      "depressionCh4",
      "depressionCh5",
      "depressionCh6",
      "depressionCh7",
      "depressionCh8",
      "depressionCh9",
      "depressionCh10",
      "depressionCh11",
    ];
    const fieldList3 = [
      "depressionCh12",
      "depressionCh13",
      "depressionCh14",
      "depressionCh15",
      "depressionCh16",
      "depressionCh17",
      "depressionCh18",
      "depressionCh19",
      "depressionCh20",
    ];
    let canSave: boolean = false;
    let isValidate: boolean = true;
    fieldList1.forEach((el) => {
      if (this.model[el] == null || this.model[el] == undefined) {
        isValidate = false;
      }
    });
    if (!isValidate) {
      this.messageService.add({
        severity: "error",
        summary: "โปรดกรอกข้อมูลแบบคัดกรองโรคซึมเศร้าด้วย 2 คำถามให้ครบทุกข้อ",
        detail: "",
      });
    }
    canSave = isValidate;
    if (isValidate) {
      let isStep1: boolean = true;
      fieldList1.forEach((en) => {
        if (this.model[en] == 1) {
          isStep1 = false;
        }
      });
      canSave = isStep1;
      if (!isStep1) {
        let isStep2: boolean = true;
        fieldList2.forEach((ev) => {
          if (this.model[ev] == null || this.model[ev] == undefined) {
            isStep2 = false;
          }
        });
        canSave = isStep2;
        if (!isStep2) {
          this.messageService.add({
            severity: "error",
            summary:
              "โปรดกรอกข้อมูลแบบประเมินโรคซึมเศร้าด้วย 9 คำถามให้ครบทุกข้อ",
            detail: "",
          });
        }
        if (isStep2) {
          let sumSucuid: number = 0;
          fieldList2.forEach((ed) => {
            sumSucuid += +this.model[ed];
          });

          let isStep3: boolean = true;
          fieldList3.forEach((et) => {
            if (this.model[et] == null || this.model[et] == undefined) {
              isStep3 = false;
            }
          });
          canSave = isStep2 && sumSucuid <= 6;
          if (!isStep3 && sumSucuid > 6) {
            this.messageService.add({
              severity: "error",
              summary: "โปรดกรอกข้อมูลแบบประเมินการฆ่าตัวตาย ให้ครบทุกข้อ",
              detail: "",
            });
          } else {
            canSave = true;
          }
        }
      }
    }

    return canSave;
  }
  ngOnInit(): void {
    this.setInitialCreatingData();
  }
  async onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.isUpdateMode) {
        this.service.update(this.id, this.model).subscribe((value) => {
          // if(this.userDataService.isStudent()){
          const infoId = this.router.url.split("/").reverse()[0];
          this.toItem("depression", +infoId, true);
          window.location.reload();
          // }else{
          //   this.backTolist()
          // }
        });
      } else {
        this.service.create(this.model).subscribe((value) => {
          // if(this.userDataService.isStudent()){
          const infoId = this.router.url.split("/").reverse()[0];
          this.toItem("depression", +infoId, true);
          window.location.reload();
          // }else{
          //   this.backTolist()
          // }
        });
      }
    }
  }
  backTolist() {
    if (this.userDataService.isStudent()) {
      const infoId = this.router.url.split("/").reverse()[0];
      this.toItem("student", +infoId, true);
    } else {
      this.toList("depression");
    }
  }
  modelChange(e: any) {
    let sumOption1 = this.getSumOption1();
    let sumOption2 = this.getSumOption2();

    if (sumOption1 > 0) {
      this.show9q = true;
    } else {
      this.show9q = false;
      this.show8q = false;
      this.clear89q();
      sumOption1 = this.getSumOption1();
      sumOption2 = this.getSumOption2();
    }
    if (sumOption2 > 6) {
      this.show8q = true;
    } else {
      this.show8q = false;
      this.clear8q();
      sumOption1 = this.getSumOption1();
      sumOption2 = this.getSumOption2();
    }
  }
  clear8q() {
    this.model.depressionCh12 = null;
    this.model.depressionCh13 = null;
    this.model.depressionCh14 = null;
    this.model.depressionCh15 = null;
    this.model.depressionCh16 = null;
    this.model.depressionCh17 = null;
    this.model.depressionCh18 = null;
    this.model.depressionCh19 = null;
    this.model.depressionCh20 = null;
  }
  clear89q() {
    this.model.depressionCh3 = null;
    this.model.depressionCh4 = null;
    this.model.depressionCh5 = null;
    this.model.depressionCh6 = null;
    this.model.depressionCh7 = null;
    this.model.depressionCh8 = null;
    this.model.depressionCh9 = null;
    this.model.depressionCh10 = null;
    this.model.depressionCh11 = null;
    this.model.depressionCh12 = null;
    this.model.depressionCh13 = null;
    this.model.depressionCh14 = null;
    this.model.depressionCh15 = null;
    this.model.depressionCh16 = null;
    this.model.depressionCh17 = null;
    this.model.depressionCh18 = null;
    this.model.depressionCh19 = null;
    this.model.depressionCh20 = null;
  }
  getSumOption2(): number {
    return (
      this.model.depressionCh3 +
      this.model.depressionCh4 +
      this.model.depressionCh5 +
      this.model.depressionCh6 +
      this.model.depressionCh7 +
      this.model.depressionCh8 +
      this.model.depressionCh9 +
      this.model.depressionCh10 +
      this.model.depressionCh11
    );
  }
  getSumOption1(): number {
    if (this.model.depressionCh1 || this.model.depressionCh2) {
      return 2;
    } else {
      return 0;
    }
  }
  pageEdit() {
    // localStorage
    const infoId = this.router.url.split("/").reverse()[0];

    this.toItem("depression", +infoId, false);
  }
  getDepression() {
    const fieldArr: string[] = [
      "depressionCh3",
      "depressionCh4",
      "depressionCh5",
      "depressionCh6",
      "depressionCh7",
      "depressionCh8",
      "depressionCh9",
      "depressionCh10",
      "depressionCh11",
    ];
    const sumvalue = this.getSumValue(fieldArr);
    if (sumvalue < 7) {
      return "ไม่มี";
    }
    if (sumvalue >= 7 && sumvalue <= 12) {
      return "ระดับน้อย";
    }
    if (sumvalue >= 13 && sumvalue <= 18) {
      return "ระดับปานกลาง";
    }
    if (sumvalue >= 19) {
      return "ระดับรุนแรง";
    }
    return "";
  }
  getSucuid() {
    const fieldArr: string[] = [
      "depressionCh12",
      "depressionCh13",
      "depressionCh14",
      "depressionCh15",
      "depressionCh16",
      "depressionCh17",
      "depressionCh18",
      "depressionCh19",
      "depressionCh20",
    ];
    const sumvalue = this.getSumValue(fieldArr);
    if (sumvalue < 1) {
      return "ไม่มี";
    }
    if (sumvalue >= 1 && sumvalue <= 8) {
      return "ระดับน้อย";
    }
    if (sumvalue >= 9 && sumvalue <= 16) {
      return "ระดับปานกลาง";
    }
    if (sumvalue >= 17) {
      return "ระดับรุนแรง";
    }
    return "";
  }
  getSumValue(fieldArr: string[]) {
    let sumValue: number = 0;
    fieldArr.forEach((el) => {
      sumValue += +this.model[el];
    });
    return sumValue;
  }
}
