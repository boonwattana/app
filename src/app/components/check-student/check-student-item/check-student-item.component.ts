import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { forkJoin } from "rxjs";
import { SelectItems } from "src/app/shared/models/miscellaneous";
import { BaseItemComponent } from "src/app/shared/component/base-item/base-item.component";
import { BaseItemInterface } from "src/app/shared/interface/base-item-interface";
import { CheckStudentItemModel } from "../check-student-model";
import { CheckStudentService } from "../check-student.service";
import { StudentItemModel } from "../../student/student-model";
import * as moment from "moment-timezone";
import { BLOOD_TYPE } from "src/app/shared/constants/dropdown-constanst";
import { UserDataService } from "src/app/shared/services/user-data.service";
@Component({
  selector: "check-student-item",
  templateUrl: "./check-student-item.component.html",
  styleUrls: ["./check-student-item.component.scss"],
})
export class CheckStudentItemComponent
  extends BaseItemComponent<CheckStudentItemModel>
  implements BaseItemInterface
{
  isStudent = false;
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private readonly service: CheckStudentService,
    router: Router,
    route: ActivatedRoute,
    private readonly userDataService: UserDataService,
    private readonly messageService: MessageService
  ) {
    super(el, renderer, router, route);
    this.isStudent = this.userDataService.getUserType() == "Student";
  }
  noGlassesRightDropdown: SelectItems[] = [];
  noGlassesLeftDropdown: SelectItems[] = [];
  glassesRightDropdown: SelectItems[] = [];
  glassesLeftDropdown: SelectItems[] = [];
  contactLensRightDropdown: SelectItems[] = [];
  contactLensLeftDropdown: SelectItems[] = [];
  studentDropdown: SelectItems[] = [];
  yearTermDropdown: SelectItems[] = [];
  formValidate: boolean = true;

  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    if (this.isUpdateMode) {
      this.getById();
    } else {
      this.setInitialCreatingData();
    }
    this.onAsyncRunner();
  }

  onEnumLoader(): void {
    this.noGlassesRightDropdown = this.dropdownService.getEyeOptiomDropdown();
    this.noGlassesLeftDropdown = this.dropdownService.getEyeOptiomDropdown();
    this.glassesRightDropdown = this.dropdownService.getEyeOptiomDropdown();
    this.glassesLeftDropdown = this.dropdownService.getEyeOptiomDropdown();
    this.contactLensRightDropdown = this.dropdownService.getEyeOptiomDropdown();
    this.contactLensLeftDropdown = this.dropdownService.getEyeOptiomDropdown();
  }
  getById(): void {
    this.service.getItem(this.id).subscribe((result) => {
      if (result) {
        this.isUpdateMode = true;
        this.model = result;
      } else {
        this.isUpdateMode = false;
      }

      this.onAsyncRunner(result);
      this.getStudentModel(this.id);
    });
  }
  getCurrentTerm() {
    this.service.getCurrentTerm().subscribe((result) => {
      if (result) {
        this.model.yearTermId = result.id;
      }
    });
  }
  getStudentModel(id: number) {
    this.service.getStudentItem(id).subscribe((result) => {
      const studentModel = result as StudentItemModel;
      this.model.studentValue =
        studentModel.firstname + " " + studentModel.lastname;
      this.model.classroomTypeValue = studentModel.classroomTypeValue;
      this.model.classroomValue = studentModel.classroomValue;
      this.model.gendar = studentModel.gendarValue;
      this.model.birthDate = this.getAgeBirthDate(studentModel.birthDate);
      this.model.age = this.getAge(studentModel.birthDate);
      this.model.bloodTypeValue = this.getBloodType(studentModel.bloodType);
    });
  }
  getAge(birthDate: Date): string {
    if (birthDate) {
      return moment().diff(birthDate, "years").toString();
    }
    return "";
  }
  getBloodType(bloodType: number): string {
    const result = BLOOD_TYPE.find((fl) => fl.value == bloodType);
    return result?.label;
  }
  getAgeBirthDate(birthDate: Date): string {
    if (birthDate) {
      let june = moment(birthDate.toLocaleString());
      const month = june.month();
      const year = june.year();
      const day = june.date();
      return `${day}/${
        month.toString().length == 1 ? `0${month + 1}` : month + 1
      }/${year + 543}`;
    }

    return ``;
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader();

    forkJoin(this.service.getYearTermDropdown()).subscribe(
      ([yearTermDropdown]) => {
        [(this.yearTermDropdown = yearTermDropdown as SelectItems[])];
      }
    ),
      (error) => {};
  }
  async setInitialCreatingData() {
    this.service.initial(this.id).subscribe((result) => {
      this.model = result;
      this.getStudentModel(this.id);
      this.getCurrentTerm();
    });
  }
  onSave(): void {
    this.onSubmit(this.validateField() && this.customValidate());
  }
  ngOnInit(): void {
    this.setInitialCreatingData();
  }
  async onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.isUpdateMode) {
        this.service.update(this.id, this.model).subscribe((value) => {
          if (this.userDataService.isStudent()) {
            const infoId = this.router.url.split("/").reverse()[0];
            this.toItem("check-student", +infoId, true);
          } else {
            this.backTolist();
          }
        });
      } else {
        this.service.create(this.model).subscribe((value) => {
          if (this.userDataService.isStudent()) {
            const infoId = this.router.url.split("/").reverse()[0];
            this.toItem("check-student", +infoId, true);
          } else {
            this.backTolist();
          }
        });
      }
    } else {
      this.messageService.add({
        severity: "error",
        summary: "ท่านยังกรอกข้อมูลไม่ครบถ้วน",
        detail: "",
      });
    }
  }
  backTolist() {
    if (this.userDataService.isStudent()) {
      const infoId = this.router.url.split("/").reverse()[0];
      this.toItem("student", +infoId, true);
    } else {
      this.toList("check-student");
    }
  }
  pageEdit() {
    const infoId = this.router.url.split("/").reverse()[0];

    this.toItem("check-student", +infoId, false);
  }
  validate() {
    let valid = false;
    const key = [
      this.model.earLess,
      this.model.speakingHearing,
      this.model.bone,
      this.model.skin,
      this.model.thyroid,
      this.model.throatTonsil,
      this.model.gum,
      this.model.mouthTongue,
      this.model.nose,
      this.model.ear,
      this.model.eye,
      this.model.hairAndHead,
    ];
    key.forEach((el) => {

      if (el == undefined) {
        valid = true;
      }
    });
    return valid;
  }
  validateEye(key: any[]) {
    let valid = true;

    key.forEach((el) => {
      if (el) {
        valid = false;
      }
    });
    return valid;
  }
  customValidate() {
    let valid = true;
    const key = [
      this.validate(),
      this.model.eysExam || this.model.glasses || this.model.contactLens,
      this.model.leftNormal ||
        this.model.leftShort ||
        this.model.leftBend ||
        this.model.leftLong,
      this.model.rightNormal ||
        this.model.rightShort ||
        this.model.rightBend ||
        this.model.rightLong,
      this.model.colorBlindnessInNormal || this.model.colorBlindnessNormal,
    ];
    key.forEach((el) => {
      if (el==undefined) {
        valid = false;
      }
    });
    
    return valid;
  }
}
