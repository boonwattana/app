import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
@Injectable({
  providedIn: 'root'
})
export class StudentReportService {
  getRpSumarize(): any {
    const url = `/report/student-sumarize`;
    return  this.gateway.get(url);
  }
  getRpByclass(): any{
    const url = `/report/student-by-class`;
    return  this.gateway.get(url);
  }
  getRpByroom(): any {
    const url = `/report/student-by-room`;
    return  this.gateway.get(url);
  }
  servicePath = '/student';
  constructor(private gateway: GatewayService) { }

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
  getBirthCountryDropdown(): any {
    const url = `${this.servicePath}/birth-country-dropdown`;
    return  this.gateway.get(url);
  }
  getCountryDropdown(): any {
    const url = `${this.servicePath}/country-dropdown`;
    return  this.gateway.get(url);
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
  getContractCountryDropdown(): any {
    const url = `${this.servicePath}/contract-country-dropdown`;
    return  this.gateway.get(url);
  }
  getContractProvinceDropdown(id:number): any {
    const url = `${this.servicePath}/contract-province-dropdown/${id}`;
    return  this.gateway.get(url);
  }
  getContractDistrictDropdown(id:number): any {
    const url = `${this.servicePath}/contract-district-dropdown/${id}`;
    return  this.gateway.get(url);
  }
  getContractSubDistrictDropdown(id:number): any {
    const url = `${this.servicePath}/contract-sub-district-dropdown/${id}`;
    return  this.gateway.get(url);
  }
  getAliveWithDropdown(): any {
    const url = `${this.servicePath}/alive-with-dropdown`;
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
  getParentStatusDropdown(): any {
    const url = `${this.servicePath}/parent-status-dropdown`;
    return  this.gateway.get(url);
  }
  
}
