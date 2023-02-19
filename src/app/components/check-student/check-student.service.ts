import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { CheckStudentItemModel } from './check-student-model';
@Injectable({
  providedIn: 'root'
})
export class CheckStudentService {
  servicePath = '/check-student';
  constructor(private gateway: GatewayService) { }
  getRpSumarize(): any {
    const url = `/report/check-student-sumarize`;
    return  this.gateway.get(url);
  }
  create(model:CheckStudentItemModel):any{    
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
 
  update(id:number,model:CheckStudentItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial(id:number):any{
    const model =new CheckStudentItemModel()
    model.studentId = id
    return of(model)  ;
  }
  getCurrentTerm(): any {
    const url = `${this.servicePath}/current-term`;
    return  this.gateway.get(url);
  }
  
  getStudentItem(id:number): any {
    const url = `${this.servicePath}/item-student/${id}`;
    return  this.gateway.get(url);
  }
  
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomDropdown(): any {
    const url = `${this.servicePath}/classroom-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomTypeDropdown(): any {
    const url = `${this.servicePath}/classroom-type-dropdown`;
    return  this.gateway.get(url);
  }
}
