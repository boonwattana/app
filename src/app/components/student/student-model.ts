export class StudentListModel{
    id:number
    studentCode: string;
    studentNumber: number;
    status: number;
    firstname: string;
    lastname: string;
    nameValue: string;
    gendarId: number;
    gendarValue: string;
    classroomValue: string;
    personalCode:string
    birthDate:string;
    addressValue:string
    classroomTypeValue:string
   
}
export class StudentItemModel{
    id:number
    studentCode: string;
    studentNumber: number;
    imageProfile: string[];
    status: number;
    title: number;
    titleEn:number
    acceptDate:Date
    firstname: string;
    lastname: string;
    firstnameEn: string;
    lastnameEn: string;
    gendarId: number;
    gendarValue: string;
    birthDate: Date;
    leaveDate: Date;
    nationalityId: number;
    nationalityValue: string;
    ethnicityId: number;
    ethnicityValue: string;
    religionId: number;
    religionValue: string;
    email: string;
    phoneNumber: string;
    specialAbility: string;
    birthHospital: string;
    birthCountryId: number;
    birthCountryValue: string;
    birthProvinceId: number;
    birthDistrictId: number;
    birthSubDistrictId: number;
    birthProvinceValue: string;
    birthDistrictValue: string;
    birthSubDistrictValue: string;
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
    contractHouseNumber: string;
    contractVillage: string;
    contractRoad: string;
    contractCountryId: number;
    contractCountryValue: string;
    contractProvinceId: number;
    contractProvinceValue: string;
    contractDistrictId: number;
    contractDistrictValue: string;
    contractSubDistrictId: number;
    contractSubDistrictValue: string;
    oldSchoolName: string;
    oldSchoolCountryId: number;
    oldSchoolProvinceId: number;
    oldSchoolDistrictId: number;
    oldSchoolSubDistrictId: number;
    oldSchoolCountryValue: string;
    oldSchoolProvinceValue: string;
    oldSchoolDistrictValue: string;
    oldSchoolSubDistrictValue: string;
    closeFriendInClass: string;
    closeFriendInClassNickname: string;
    closeFriendInClassSchool: string;
    closeFriendInClassPhone: string;
    closeFriendOtherClass: string;
    closeFriendOtherClassNickname: string;
    closeFriendOtherClassSchool: string;
    closeFriendOtherClassPhone: string;
    bloodType: number;
    congenitalDisease: string;
    height: number;
    weight: number;
    defect: string;
    aliveWithId: number;
    aliveWithValue: string;
    parentStatus: number;
    classroomId: number;
    classroomValue: string;
    fatherTitle: number;
    fatherFirstname: string;
    fatherLastname: string;
    fatherPersonalCode: string;
    fatherBloodType: number;
    fatherIncome: string;
    fatherOccupation: string;
    fatherPhone: string;
    motherTitle: number;
    motherFirstname: string;
    motherLastname: string;
    motherPersonalCode: string;
    motherBloodType: number;
    motherIncome: string;
    motherOccupation: string;
    motherPhone: string;
    parentTitle: number;
    parentFirstname: string;
    parentLastname: string;
    parentPersonalCode: string;
    parentBloodType: number;
    parentIncome: string;
    parentOccupation: string;
    parentPhone: string;
    personalCode:string
    classroomTypeValue:string
    classroomTypeId:number
    mentorTeacher:string
    oldSchoolPostCode: string;
    contractPostCode: string;
    birthPostCode: string;
    postCode: string;
    classSpecial?: number;
    classSpecialText?: string;
    reasonResign: string;
}
