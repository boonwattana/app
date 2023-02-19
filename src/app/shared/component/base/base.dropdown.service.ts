import { Injectable } from "@angular/core";
import { BLOOD_TYPE, EDIT_REQUEST_STATUS, EDUCATION, EDUCATION_STATUS, FATHER_TITLE, GENDAR, MOTHER_TITLE, PARENT_TITLE, STUDENT_STATUS, STUDENT_TITLE, TEACHER_STATUS ,
   TEACER_POSITION_NAME, PRACTITIONER_NO,
   
   TEACHER_TITLE, TEACHER_WORK_STATUS,LIVE_WITH, FAMILY_STATUS, PARENTS_NUTURE_STUDENTS, FAMILY_MEMBER_RELATIONSHIP, FAMILY_MEET_TIME, STUDENT_FAMMILY_MEMBER_CLOSEST, COMMUNITY_ENVIROMENT, VISIT_CARRIES, RESIDENCE_ENVIROMENT, HOW_GO_SCHOOL, HOME_SCHOOL_DISTANCE, ROUTE_SCHOOL, ROLE_IN_HOME, HOBBIES, READ_FREQUENCY, SUPPLIE_STORAGE_FREQUENCY, WORK_BOOK_CHECKED_FREQUENCY, EYE_OPTION, UESR_TYPE_OPTION, PERFOMANCE_TYPE_DROPDOWN, CONSULTANT_TYPE, RESULT_HELP_TYPE, RESULT_TYPE, STORY_TYPE, SENT_TYPE_TEACHER, SENT_TYPE_GUID, STUDENT_FILTER_DROPDOWN, EVIDENCE_TYPE, STUDENT_TITLE_EN, TEACHER_TITLE_EN, ACTION_TEACH, CLASS_SPECIAL1, CLASS_SPECIAL2 } from "../../constants/dropdown-constanst";
import { transformLabel } from "../../functions/values";
import { SelectItems } from "../../models/miscellaneous";
import { GatewayService } from "../../services/gateway";

@Injectable({
  providedIn: 'root',
})
export class BaseDropdownService {
  getStudentFilterDropdown(): SelectItems[] {
    return transformLabel(STUDENT_FILTER_DROPDOWN);
  }
  getPerformanceDropdown(): SelectItems[] {
    return transformLabel(PERFOMANCE_TYPE_DROPDOWN);
  }
  getResultHelpTypeDropdown(): SelectItems[] {
    return transformLabel(RESULT_HELP_TYPE);
  }
  getSentTypeGuidDropdown(): SelectItems[] {
    return transformLabel(SENT_TYPE_GUID);
  }
  getSentTypeTeacherDropdown(): SelectItems[] {
    return transformLabel(SENT_TYPE_TEACHER);
  }
  getResultTypeDropdown(): SelectItems[] {
    return transformLabel(RESULT_TYPE);
  }
  getStoryTypeDropdown(): SelectItems[] {
    return transformLabel(STORY_TYPE);
  }
  getConsultantTypeDropdown(): SelectItems[] {
    return transformLabel(CONSULTANT_TYPE);
  }
  getTypeDropdown (): SelectItems[] {
      return transformLabel(UESR_TYPE_OPTION);
  }
  getEyeOptiomDropdown(): SelectItems[] {
    return transformLabel(EYE_OPTION);
  }
  getEducationStatusDropdown(): SelectItems[] {
    return transformLabel(EDUCATION_STATUS);
  }
  getTeacherWorkStatusDropdown(): SelectItems[] {
    return transformLabel(TEACHER_WORK_STATUS);
  }
  
  getTeacherTitleEnDropdown(): SelectItems[] {
    return transformLabel(TEACHER_TITLE_EN);
  }
  getTeacherTitleDropdown(): SelectItems[] {
    return transformLabel(TEACHER_TITLE);
  }
  getTeacherStatusDropdown(): SelectItems[] {
    return transformLabel(TEACHER_STATUS);
  }

  getTeacherPositionNameDropdown(): SelectItems[] {
    return transformLabel(TEACER_POSITION_NAME);
  }
//PRACTITIONE
  getTeacherPractitionerDropdown():SelectItems[]{
    return transformLabel(PRACTITIONER_NO);
  }



  getEducationDropdown(): SelectItems[] {
    return transformLabel(EDUCATION);
  }
  
  getActionTeach(): SelectItems[] {
    return transformLabel(ACTION_TEACH);
  }
  getMotherTitleDropdown(): SelectItems[] {
    return transformLabel(MOTHER_TITLE);
  }
  getFathertTitleDropdown(): SelectItems[] {
    return transformLabel(FATHER_TITLE);
  }
  getStudentTitleDropdown(): SelectItems[] {
    return transformLabel(STUDENT_TITLE);
  }
  
  getStudentTitleEnDropdown(): SelectItems[] {
    return transformLabel(STUDENT_TITLE_EN);
  }
  getEditRequestStatusDropdown(): SelectItems[] {
    return transformLabel(EDIT_REQUEST_STATUS);
  }
  getClassSpecial2Dropdown(): SelectItems[] {
    return transformLabel(CLASS_SPECIAL2);
  }
  getClassSpecial1Dropdown(): SelectItems[] {
    return transformLabel(CLASS_SPECIAL1);
  }
  getBloodTypeDropdown(): SelectItems[] {
    return transformLabel(BLOOD_TYPE);
  }
  getTitleDropdown(): SelectItems[] {
    return transformLabel(STUDENT_TITLE);
  }
  getParentTitleDropdown(): SelectItems[] {
    return transformLabel(PARENT_TITLE);
  }
  getStatusDropdown(): SelectItems[] {
    return transformLabel(STUDENT_STATUS);
  }
  servicePath = '';
  constructor(private dataGateway: GatewayService) {}
  setPath(param: any): void {
    this.servicePath = param.servicePath;
  }
  // getBranchDropDown(conditions?: SearchCondition[]): DataServiceModel {
  //   const url: string = Url.base_url + `${this.servicePath}/GetBranchDropDown`;
  //   return this.dataGateway.getDropdown(url, conditions);
  // }
  getGendarDropdown(): SelectItems[] {
    return transformLabel(GENDAR);
  }
  getLiveWithDropdown(): SelectItems[] {
    return transformLabel(LIVE_WITH);
  }
  getFamilyStatusDropdown(): SelectItems[] {
    return transformLabel(FAMILY_STATUS);
  }
  getHowParentsNurtureStudentsDropdown(): SelectItems[] {
    return transformLabel(PARENTS_NUTURE_STUDENTS);
  }
  getFamilyMemberRelationshipsDropdown(): SelectItems[] {
    return transformLabel(FAMILY_MEMBER_RELATIONSHIP);
  }
  getMemberMeetTogetherDropdown(): SelectItems[] {
    return transformLabel(FAMILY_MEET_TIME);
  }
  getStudentAreClosestDropdown(): SelectItems[] {
    return transformLabel(STUDENT_FAMMILY_MEMBER_CLOSEST);
  }
  getCommunityEnvironmentDropdown(): SelectItems[] {
    return transformLabel(COMMUNITY_ENVIROMENT);
  }

  getVisitTraveledByDropdown(): SelectItems[] {
    return transformLabel(VISIT_CARRIES);
  }

  getResidenceStatusDropdown(): SelectItems[] {
    return transformLabel(RESIDENCE_ENVIROMENT);
  }

  getComeToSchoolDropdown(): SelectItems[] {
    return transformLabel(HOW_GO_SCHOOL);
  }

  getDistanceHomeAndSchoolDropdown(): SelectItems[] {
    return transformLabel(HOME_SCHOOL_DISTANCE);
  }

  getRouteOfTravelToSchoolDropdown(): SelectItems[] {
    return transformLabel(ROUTE_SCHOOL);
  }

  getRoleInHomeDropdown(): SelectItems[] {
    return transformLabel(ROLE_IN_HOME);
  }
  getHobbiesDropdown(): SelectItems[] {
    return transformLabel(HOBBIES);
  }
  getReadFrequencyDropdown(): SelectItems[] {
    return transformLabel(READ_FREQUENCY);
  }
  getSchoolSupplieStorageFrequencyDropdown(): SelectItems[] {
    return transformLabel(SUPPLIE_STORAGE_FREQUENCY);
  }
  getWorkBookCheckedFrequencyDropdown(): SelectItems[] {
    return transformLabel(WORK_BOOK_CHECKED_FREQUENCY);
  }

  getEvidenceTypeDropdown(): SelectItems[] {
    return transformLabel(EVIDENCE_TYPE);
  }

 
 
}
