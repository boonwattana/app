import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { TeacherItemModel } from './teacher-model';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  getRpBySubject(): any{
    const url = `/report/teacher-by-subject`;
    return  this.gateway.get(url);
  }
  getRpSumarize(): any {
    const url = `/report/teacher-sumarize`;
    return  this.gateway.get(url);
  }
  servicePath = '/teacher';
  constructor(private gateway: GatewayService) { }
  create(model:TeacherItemModel):any{    
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
  getGendarDropdown(): any {
    const url = `${this.servicePath}/gendar-dropdown`;
    return  this.gateway.get(url);
  }
  getNationalityDropdown(): any {
    const url = `${this.servicePath}/nationality-dropdown`;
    return  this.gateway.get(url);
  }
  getEthnicityDropdown(): any {
    const url = `${this.servicePath}/ethnicity-dropdown`;
    return  this.gateway.get(url);
  }
  getReligionDropdown(): any {
    const url = `${this.servicePath}/religion-dropdown`;
    return  this.gateway.get(url);
  }
  getPractitionerLevelDropdown(): any {
    const url = `${this.servicePath}/practitioner-level-dropdown`;
    return  this.gateway.get(url);
  }
  getEducationBackgroundDropdown(): any {
    const url = `${this.servicePath}/education-background-dropdown`;
    return  this.gateway.get(url);
  }
  getCountryDropdown(): any {
    const url = `${this.servicePath}/country-dropdown`;
    return  this.gateway.get(url);
  }
  // getProvinceDropdown(): any {
  //   const url = `${this.servicePath}/province-dropdown`;
  //   return  this.gateway.get(url);
  // }
  // getDistrictDropdown(): any {
  //   const url = `${this.servicePath}/district-dropdown`;
  //   return  this.gateway.get(url);
  // }
  
  getSubjectGroupDropdown(): any {
    const url = `${this.servicePath}/subject-group-dropdown`;
    return  this.gateway.get(url);
  }
  // getSubDistrictDropdown(): any {
  //   const url = `${this.servicePath}/sub-district-dropdown`;
  //   return  this.gateway.get(url);
  // }
  update(id:number,model:TeacherItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    const model = new TeacherItemModel()
    model.countryId  =66
    return of(model)  ;
  }
  getProvinceDropdown(id:number): any {
    const url = `${this.servicePath}/province-dropdown/${id}`;
    return  this.gateway.get(url);
  }
  getDistrictDropdown(id:number): any {
    const url = `${this.servicePath}/district-dropdown/${id}`;
    return  this.gateway.get(url);
  }
  getSubDistrictDropdown(id:number): any {
    const url = `${this.servicePath}/sub-district-dropdown/${id}`;
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
  
  getActivityStudentDropdown(): any {
    const url = `${this.servicePath}/activity-student-dropdown`;
    return  this.gateway.get(url);
  }
}
