export class StudentSupportListModel{
    id:number
    startDate: Date;
    endDate: Date;
    activityName: string;
    performance: number;
    department: string;
    result: string;
    teacherId: number;
    teacherValue: string;
}
export class StudentSupportItemModel{
    id:number
    startDate: Date;
    endDate: Date;
    activityName: string;
    performance: number;
    performanceText: string;
    department: string;
    result: string;
    teacherId: number;
    teacherValue: string;
    studentIdAdd:number[] =[]
    studentIdRemove:number[] = []
}
