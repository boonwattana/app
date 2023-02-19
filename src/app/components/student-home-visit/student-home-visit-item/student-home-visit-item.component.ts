import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { forkJoin } from "rxjs";
import { SelectItems } from "src/app/shared/models/miscellaneous";
import { BaseItemComponent } from "src/app/shared/component/base-item/base-item.component";
import { BaseItemInterface } from "src/app/shared/interface/base-item-interface";
import { StudentHomeVisitItemModel } from "../student-home-visit-model";
import { StudentHomeVisitService } from "../student-home-visit.service";
import * as moment from "moment-timezone";
import { BLOOD_TYPE } from "src/app/shared/constants/dropdown-constanst";
import { StudentItemModel } from "../../student/student-model";

@Component({
  selector: "student-home-visit-item",
  templateUrl: "./student-home-visit-item.component.html",
  styleUrls: ["./student-home-visit-item.component.scss"],
})
export class StudentHomeVisitItemComponent
  extends BaseItemComponent<StudentHomeVisitItemModel>
  implements BaseItemInterface
{
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private readonly service: StudentHomeVisitService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(el, renderer, router, route);
  }
  studentDropdown: SelectItems[] = [];
  liveWithDropdown: SelectItems[] = [];
  familyStatusDropdown: SelectItems[] = [];
  howParentsNurtureStudentsDropdown: SelectItems[] = [];
  familyMemberRelationshipsDropdown: SelectItems[] = [];
  memberMeetTogetherDropdown: SelectItems[] = [];
  studentAreClosestDropdown: SelectItems[] = [];
  communityEnvironmentDropdown: SelectItems[] = [];
  visitTraveledByDropdown: SelectItems[] = [];
  residenceStatusDropdown: SelectItems[] = [];
  natureOfAddressDropdown: SelectItems[] = [];
  comeToSchoolDropdown: SelectItems[] = [];
  distanceHomeAndSchoolDropdown: SelectItems[] = [];
  routeOfTravelToSchoolDropdown: SelectItems[] = [];
  roleInHomeDropdown: SelectItems[] = [];
  hobbiesDropdown: SelectItems[] = [];
  readFrequencyDropdown: SelectItems[] = [];
  schoolSupplieStorageFrequencyDropdown: SelectItems[] = [];
  workBookCheckedFrequencyDropdown: SelectItems[] = [];
  yearTermDropdown: SelectItems[] = [];
  titleStdDropdown: SelectItems[] = [];
  titleParentDropdown: SelectItems[] = [];
  sdqCurrentTermDataResult: boolean = false;
  studentID: number = Number(this.router.url.split("/").reverse()[0]);
  formValidate: boolean = true;
  type: number = 3;
  studentDontNeedHelp = false;
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    this.getSDQCurrentTermData();
    // this.onAsyncRunner();
  }

  onEnumLoader(): void {
     (this.titleStdDropdown = this.dropdownService.getStudentTitleDropdown()),
     (this.titleParentDropdown = this.dropdownService.getParentTitleDropdown()),
    (this.liveWithDropdown = this.dropdownService.getLiveWithDropdown()),
      (this.familyStatusDropdown =
        this.dropdownService.getFamilyStatusDropdown()),
      (this.howParentsNurtureStudentsDropdown =
        this.dropdownService.getHowParentsNurtureStudentsDropdown()),
      (this.familyMemberRelationshipsDropdown =
        this.dropdownService.getFamilyMemberRelationshipsDropdown()),
      (this.memberMeetTogetherDropdown =
        this.dropdownService.getMemberMeetTogetherDropdown()),
      (this.studentAreClosestDropdown =
        this.dropdownService.getStudentAreClosestDropdown()),
      (this.communityEnvironmentDropdown =
        this.dropdownService.getCommunityEnvironmentDropdown()),
      (this.visitTraveledByDropdown =
        this.dropdownService.getVisitTraveledByDropdown()),
      (this.residenceStatusDropdown =
        this.dropdownService.getResidenceStatusDropdown()),
      (this.comeToSchoolDropdown =
        this.dropdownService.getComeToSchoolDropdown()),
      (this.distanceHomeAndSchoolDropdown =
        this.dropdownService.getDistanceHomeAndSchoolDropdown()),
      (this.routeOfTravelToSchoolDropdown =
        this.dropdownService.getRouteOfTravelToSchoolDropdown()),
      (this.roleInHomeDropdown = this.dropdownService.getRoleInHomeDropdown()),
      (this.hobbiesDropdown = this.dropdownService.getHobbiesDropdown()),
      (this.readFrequencyDropdown =
        this.dropdownService.getReadFrequencyDropdown()),
      (this.schoolSupplieStorageFrequencyDropdown =
        this.dropdownService.getSchoolSupplieStorageFrequencyDropdown()),
      (this.workBookCheckedFrequencyDropdown =
        this.dropdownService.getWorkBookCheckedFrequencyDropdown());
  }
  filterEnum(model: any, array: any) {
    let label = array.filter((element: any) => {
      return element.value === model;
    });
    return label[0]?.label;
  }
  getById(): void {
    this.service.getItem(this.studentID).subscribe((result) => {
      if (result) {
        this.model = result;
        this.model.studentTitle = result.studentTitle;
        this.model.parentTitle = result.parentTitle;
        this.model.studentFirstName = result.firstname;
        this.model.studentLastName = result.lastname;
        this.model.studentClass = result.classroomTypeValue;
        this.model.parentFirstName = result.parentFirstName;
        this.model.parentLastName = result.parentLastName;
        this.model.houseNumber = result.houseNumber;
        this.model.moo = result.village;
        this.model.street = result.road;
        this.model.subDistrictValue = result.subDistrictValue;
        this.model.districtValue = result.districtValue;
        this.model.provinceValue = result.provinceValue;
        this.model.studentTel = result.phoneNumber;
        this.model.parentTel = result.parentPhone;
        this.model.adviserNameValue = result.adviserNameValue;
        this.model.studentId = this.studentID;
      }

      this.onAsyncRunner(result);
    });
    /* this.service.getItem(this.id).subscribe(result=>{
      if(result!=undefined){
        this.isUpdateMode = true
        this.model = result
      }else{this.isUpdateMode = false}
 
      this.getStudentModel(this.id)
      this.onAsyncRunner(result);
    })*/
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
    this.service
      .getStudentHomeVisitInitialData(this.studentID)
      .subscribe((result) => {
        this.model = new StudentHomeVisitItemModel();
        this.model.studentTitle = result.studentTitle;
        this.model.parentTitle = result.parentTitle;
        this.model.studentFirstName = result.firstname;
        this.model.studentLastName = result.lastname;
        this.model.studentClass = result.classroomTypeValue;
        this.model.parentFirstName = result.parentFirstName;
        this.model.parentLastName = result.parentLastName;
        this.model.houseNumber = result.houseNumber;
        this.model.moo = result.village;
        //this.model.soy= result.;
        this.model.street = result.road;
        this.model.subDistrictValue = result.subDistrictValue;
        this.model.districtValue = result.districtValue;
        this.model.provinceValue = result.provinceValue;
        // this.model.zipCode= result.;
        this.model.studentTel = result.phoneNumber;
        this.model.parentTel = result.parentPhone;
        // this.model.atYear= result.atYear;
        // this.model.atSemester= result.atSemester;
        this.model.adviserNameValue = result.adviserNameValue;
        this.getCurrentTerm();
        this.model.studentId = this.studentID;
        //defualt number require
        this.model.getMoneyForSchool=0;
        this.model.totalHouseholdMember=0;
        this.model.totalIncludeStudent=0;
        this.model.totalBrother1=0;
        this.model.totalBrather2=0;
        this.model.totalSister1=0;
        this.model.totalSister2=0;
        this.model.totalStudentLeaning=0;
        this.model.totalStudentSchool=0;

      });
  }
  onSave(): void {
    this.onSubmit(this.validateField());
  }
  ngOnInit(): void {
    this.setInitialCreatingData();
  }
  async onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.isUpdateMode) {
        this.service.update(this.id, this.model).subscribe((value) => {
          this.backTolist();
        });
      } else {
        this.service.create(this.model).subscribe((value) => {
          this.backTolist();
        });
      }
    }
  }
  needChange(e: any) {
    if (e) {
      this.model.isHelpStudentNeed = false;
    }
  }
  needChange2(e: any) {
    if (e) {
      this.studentDontNeedHelp = false;
    }
  }
  backTolist() {
    this.toList("student-home-visit");
    
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
      this.model.studentId = this.id;
      this.model.studentValue =
        studentModel.firstname + " " + studentModel.lastname;
      // this.model.classroomTypeValue = studentModel.classroomTypeValue
      // this.model.classroomValue = studentModel.classroomValue
      // this.model.phoneNumber = studentModel.phoneNumber
      // this.model.mentorTeacher = studentModel.mentorTeacher
      // this.model.parentPhoneNumber = studentModel.parentPhone
      // this.model.parentName = `${studentModel.parentFirstname?studentModel.parentFirstname:'-'}  ${studentModel.parentLastname?studentModel.parentLastname:'-'}`
      // this.model.address = `ถนน ${studentModel.contractRoad?studentModel.contractRoad:'-'} หมู่ ${studentModel.village?studentModel.village:'-'} ตำบล ${studentModel.contractSubDistrictValue?studentModel.contractSubDistrictValue:'-'} อำเภอ ${studentModel.contractDistrictValue?studentModel.contractDistrictValue:'-'} จังหวัด ${studentModel.contractProvinceValue?studentModel.contractProvinceValue:'-'}`
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
    return result.label;
  }
  getAgeBirthDate(birthDate: Date): string {
    if (birthDate) {
      let june = moment(this.model.toLocaleString());

      // const month  =june.tz('Asia/Tokyo').toLocaleString('dd/mm/yyy')
      const month = june.month();
      const year = june.year();
      const day = june.date();

      // const dateArr = daysTimeArr[0].split('-')
      return `${day}/${
        month.toString().length == 1 ? `0${month + 1}` : month + 1
      }/${year}`;
    }

    return ``;
  }
  pageEdit() {
    const infoId = this.router.url.split("/").reverse()[0];

    this.toItem("student-home-visit", +infoId, false);
    window.location.reload();

  }

  async getSDQCurrentTermData() {
    this.service.getSDQCurrentTermData(this.studentID).subscribe((result) => {
      this.sdqCurrentTermDataResult = result;
      this.isUpdateMode = this.sdqCurrentTermDataResult;
      if (this.isUpdateMode) {
        this.getById();
      } else {
        this.setInitialCreatingData();
      }
      this.onAsyncRunner();
    });
  }
}
