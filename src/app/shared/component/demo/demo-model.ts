export class DemoListModel{
    id:number
    demoEmail: string;
    demoNumber: number;
    demoDate: Date;
    demoEnum: string;
}
export class DemoItemModel{
    id:number
    demoEmail: string;
    demoNumber: number;
    demoDate: Date;
    demoEnum: number;
    isActive:boolean;
    demoImages: string[]
    demoRadio: number;
}