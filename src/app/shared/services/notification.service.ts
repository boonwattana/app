import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
  })
  export class NotificationService {
    
    constructor(private messageService: MessageService) {}
    showErrorMessageFromResponse(err: any) {
        
        this.messageService.add({severity:'error', summary:err.status, detail:err.statusText});
    }
    showErrorMessageFromResponsePdf(err: any) {
      
      this.messageService.add({severity:'error', summary:'ไม่มีข้อมูล...', detail:'ไม่มีข้อมูลจากตัวกรองที่เลือก หรือเอกสารยังไม่เสร็จสิ้น'});
  }
    showMessageFromResponse(res:any){
      if(!res.success){
        this.messageService.add({severity:'error', summary:res.status,  detail:res.message});

      }else{
        this.messageService.add({severity:'success', summary:res.status, detail:'ดำเนินการสำเร็จ...'});

      }

    }
  }
  