import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { TeachingScheduleItemModel } from './teaching-schedule-model';
@Injectable({
  providedIn: 'root'
})
export class TeachingScheduleService {
  servicePath = '/teaching-schedule';
  constructor(private gateway: GatewayService) { }
  create(model:TeachingScheduleItemModel):any{    
    const url = `${this.servicePath}/create`;
    return  this.gateway.create(url,model);
  }
  getList(search: SearchParameter): any {
    const url = `${this.servicePath}/list`;
    return  this.gateway.list(url, search);
  }
  getItem(id:number): any {
    const url = `${this.servicePath}/item/${id}`;
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
  update(id:number,model:TeachingScheduleItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new TeachingScheduleItemModel())  ;
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
