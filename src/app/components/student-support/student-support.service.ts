import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { StudentSupportItemModel } from './student-support-model';
@Injectable({
  providedIn: 'root'
})
export class StudentSupportService {
  checkIsExist(studentId:number,id:number):any{    
    const url = `${this.servicePath}/check-is-exist`;
    return  this.gateway.validate(url,{studentId,id});
  }

  servicePath = '/student-support';
  constructor(private gateway: GatewayService) { }
  create(model:StudentSupportItemModel):any{    
    const url = `${this.servicePath}/create`;
    return  this.gateway.create(url,model);
  }
  getList(search: SearchParameter): any {
    const url = `${this.servicePath}/list`;
    return  this.gateway.list(url, search);
  }
  getListStudent(search: SearchParameter): any {
    const url = `${this.servicePath}/list-student`;
    return  this.gateway.list(url, search);
  }
  getListHasStudent(search: SearchParameter): any {
    const url = `${this.servicePath}/list-has-student`;
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
  update(id:number,model:StudentSupportItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  getClassroomDropdown(): any {
    const url = `${this.servicePath}/classroom-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomTypeDropdown(): any {
    const url = `${this.servicePath}/classroom-type-dropdown`;
    return  this.gateway.get(url);
  }
  initial():any{
    return of(new StudentSupportItemModel())  ;
  }
}
