import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { SarTeachingScheduleListModel } from './sar-teaching-schedule-model';
@Injectable({
  providedIn: 'root'
})
export class SarTeachingScheduleService {
  servicePath = '/teaching-schedule';
  constructor(private gateway: GatewayService) { }
  create(model:SarTeachingScheduleListModel):any{    
    const url = `${this.servicePath}/create`;
    return  this.gateway.create(url,model);
  }
  getList(search: SearchParameter): any {
    const url = `${this.servicePath}/sar-list`;
    return  this.gateway.list(url, search);
  }
  getItem(id:number): any {
    const url = `${this.servicePath}/sar-item/${id}`;
    return  this.gateway.get(url);
  }
  getTeacherDropdown(): any {
    const url = `${this.servicePath}/teacher-dropdown`;
    return  this.gateway.get(url);
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:SarTeachingScheduleListModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new SarTeachingScheduleListModel())  ;
  }
  getItemByTeacherId(id:number): any {
    const url = `${this.servicePath}/item-by-teacher/${id}`;
    return  this.gateway.get(url);
  }
  initialByTeacherId(id:number):any{
    const url = `${this.servicePath}/initial-by-teacher/${id}`;
    return  this.gateway.get(url);
  }
  getTeachingPageModeByteacherID(id:number):any{
    const url = `${this.servicePath}/is-has-teaching-schedule/${id}`;
    return  this.gateway.get(url);
  }
  getPractitionerLevelDropdown(): any {
    const url = `${this.servicePath}/practitioner-level-dropdown`;
    return  this.gateway.get(url);
  }

}
