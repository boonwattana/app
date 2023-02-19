export class StudentConsultantListModel{
    id:number
    studentId: number;
    studentValue: string;
    activityDate: Date;
    startTime: string;
    endTime: string;
    storyType: number;
    resultType: number;
    sentType: number;
    nickName: string;
    sendNote: string;
}
export class StudentConsultantItemModel{
    id:number
    studentId: number;
    studentValue: string;
    teacherId: number;
    teacherValue: string;
    activityDate: Date;
    startTime: string;
    endTime: string;
    consultantType: number;
    storyType: number;
    resultType: number;
    sentType: number;
    sentText: string;
    nickName: string;
    sendNote: string;
}
