import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { StudentHomeVisitItemModel } from './student-home-visit-model';
@Injectable({
  providedIn: 'root'
})
export class StudentHomeVisitService {
  servicePath = '/student-home-visit';
  constructor(private gateway: GatewayService) { }
  create(model:StudentHomeVisitItemModel):any{    
    const url = `${this.servicePath}/create`;
    return  this.gateway.create(url,model);
  }
  getList(search: SearchParameter): any {
    const url = `${this.servicePath}/list`;
    return  this.gateway.list(url, search);
  }
  /*getItem(id:number): any {
    const url = `${this.servicePath}/item/${id}`;
    return  this.gateway.get(url);
  }*/

  getStudentDropdown(): any {
    const url = `${this.servicePath}/student-dropdown`;
    return  this.gateway.get(url);
  }
  getImg1Dropdown(): any {
    const url = `${this.servicePath}/img1-dropdown`;
    return  this.gateway.get(url);
  }
  getImg2Dropdown(): any {
    const url = `${this.servicePath}/img2-dropdown`;
    return  this.gateway.get(url);
  }
  getImg3Dropdown(): any {
    const url = `${this.servicePath}/img3-dropdown`;
    return  this.gateway.get(url);
  }
  getImg4Dropdown(): any {
    const url = `${this.servicePath}/img4-dropdown`;
    return  this.gateway.get(url);
  }
  getImg5Dropdown(): any {
    const url = `${this.servicePath}/img5-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:StudentHomeVisitItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new StudentHomeVisitItemModel())  ;
  }
    getStudentHomeVisitInitialData(id:number): any {
    const url = `${this.servicePath}/student-home-visit-initialData/${id}`;
    return  this.gateway.get(url);
  }
  // getClassroomDropdown(): any {
  //   const url = `${this.servicePath}/classroom-dropdown`;
  //   return  this.gateway.get(url);
  // }
  // getClassroomTypeDropdown(): any {
  //   const url = `${this.servicePath}/classroom-type-dropdown`;
  //   return  this.gateway.get(url);
  // }
  getClassroomDropdown(): any {
    const url = `${this.servicePath}/classroom-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomTypeDropdown(): any {
    const url = `${this.servicePath}/classroom-type-dropdown`;
    return  this.gateway.get(url);
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
  getStudentItem(id:number): any {
    const url = `${this.servicePath}/item-student/${id}`;
    return  this.gateway.get(url);
  }
  getCurrentTerm(): any {
    const url = `${this.servicePath}/current-term`;
    return  this.gateway.get(url);
  }
  getSDQCurrentTermData(id:number):any{
    const url = `${this.servicePath}/get-current-term-data/${id}`;
    return  this.gateway.get(url);
  }
  getItem(id:number): any {
    const url = `${this.servicePath}/student-home-item/${id}`;
    return  this.gateway.get(url);
  }
}
