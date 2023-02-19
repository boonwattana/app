export class EducationBackgroundListModel{
    id:number
    teacherId: number;
    teacherValue: string;
    educationId: number;
    educationMajor: string;
    educationShotNameTh: string;
    educationShotNameEn: string;
    educationYear: string;
    institutionName: string;
}
export class EducationBackgroundItemModel{
    id:number
    teacherId: number;
    teacherValue: string;
    educationId: number;
    educationMajor: string;
    educationShotNameTh: string;
    educationShotNameEn: string;
    educationYear: string;
    institutionName: string;
    status: number;
    otherEducationText:string
}
