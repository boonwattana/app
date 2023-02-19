import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/shared/services/gateway';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  servicePath = '/student';
  constructor(private gateway: GatewayService,private userDataService:UserDataService) { }
 
  getItem(id:number): any {
    const url = `${this.servicePath}/item/${id}`;
    return  this.gateway.get(url);
  }
   

}
