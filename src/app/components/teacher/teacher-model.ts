export class TeacherListModel{
    id:number
    titleName: string;
    teacherCode: string;
    firstname: string;
    lastname: string;
    positionNumber: string;
    positionName: string;
    practitionerLevelId: number;
    practitionerLevelValue: string;
    subjectGroupId: string;
    subjectGroupValue: string;
}
export class TeacherItemModel{
    id:number
   
    teacherPhoto: string[];
    posonalCode: string;
    teacherCode: string;
    status: number;
    title: number;
    firstname: string;
    lastname: string;
    firstnameEn: string;
    lastnameEn: string;
    gendarId: number;
    gendarValue: string;
    birthDate: Date;
    nationalityId: number;
    nationalityValue: string;
    ethnicityId: number;
    ethnicityValue: string;
    religionId: number;
    religionValue: string;
    positionNumber: string;
    positionName: number;
    practitionerLevelId: number;
    practitionerLevelValue: string;
    practitionerNo: number;
    educationBackgroundId: number;
    educationBackgroundValue: string;
    educationMajor: string;
    setInDate: Date;
    teacherClass1: boolean;
    teacherClass2: boolean;
    teacherClass3: boolean;
    teacherClass4: boolean;
    teacherClass5: boolean;
    teacherClass6: boolean;
    subjectGroupId: number;
    subjectGroupValue: string;
    teacherEmail: string;
    phoneNumber: string;
    facebookUrl: string;
    lineId: string;
    houseNumber: string;
    village: string;
    road: string;
    countryId: number;
    countryValue: string;
    provinceId: number;
    provinceValue: string;
    districtId: number;
    districtValue: string;
    subDistrictId: number;
    subDistrictValue: string;
    isOtherSubjectGroup: boolean;
    subjectGroupText: string;
    classroomId: number;
    classroomTypeId: number;
    educationMinor: string;
    setInDateSchool:Date

    classroomValue: string;
    classroomTypeValue: string;
    actionWork: string;
  activityStudentId: number;
  activityStudentValue: string;

  titleEn?: number;
  ernlyDate?: Date;

  actionWorkSpecial: string;

  actionWorkSpecial2: string;

  actionWorkSpecial3: string;

  actionWorkSpecial4: string;

  otherEducationText?: string;

  isTeacher?: boolean;
  actionTeachText:string
  actionTeach:number
  postCode:string
}
