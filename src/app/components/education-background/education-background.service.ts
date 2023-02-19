import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { EducationBackgroundItemModel } from './education-background-model';
@Injectable({
  providedIn: 'root'
})
export class EducationBackgroundService {
  servicePath = '/education-background';
  constructor(private gateway: GatewayService,private userDataService:UserDataService) { }
  create(model:EducationBackgroundItemModel):any{    
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
  update(id:number,model:EducationBackgroundItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    const model = new EducationBackgroundItemModel()
    if(this.userDataService.isTeacher()){
      model.teacherId = +this.userDataService.getInfoId()

    }
    return of(model)  ;

  }
}
