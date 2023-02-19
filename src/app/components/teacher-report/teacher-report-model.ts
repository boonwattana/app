export class TeacherReportListModel{
    id:number
    firstname: string;
    lastname: string;
    positionName: string;
    practitionerLevelId: number;
    practitionerLevelValue: string;
    subjectGroupId: string;
    subjectGroupValue: string;
    practitionerNo: string;
    birthDate?: Date;
    setInDate?: Date;
    educationMajor?: string;
    educationMinor?: string;
    actionWork: string;
    actionWorkSpecial: string;
    setInDateSchool:Date
}
export class TeacherReportItemModel{
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
    positionName: string;
    practitionerLevelId: number;
    practitionerLevelValue: string;
    practitionerNo: string;
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
  actionWorkSpecial: string;
  activityStudentId: number;
  activityStudentValue: string;
}
