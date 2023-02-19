import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { SdqParentItemModel } from './sdq-parent-model';
@Injectable({
  providedIn: 'root'
})
export class SdqParentService {
  servicePath = '/sdq-parent';
  constructor(private gateway: GatewayService) { }
  create(model:SdqParentItemModel):any{    
    const url = `${this.servicePath}/create`;
    return  this.gateway.create(url,model);
  }
  getList(search: SearchParameter): any {
    const url = `${this.servicePath}/list`;
    return  this.gateway.list(url, search);
  }
  getItem(id:number): any {
    const url = `${this.servicePath}/itemparentsdq/${id}`;
    return  this.gateway.get(url);
  }
  update(id:number,model:SdqParentItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial(id:number):any{
    const url = `${this.servicePath}/initial/${id}`;
    return  this.gateway.get(url);
    
    return of(new SdqParentItemModel())  ;
  }
  getClassroomDropdown(): any {
    const url = `${this.servicePath}/classroom-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomTypeDropdown(): any {
    const url = `${this.servicePath}/classroom-type-dropdown`;
    return  this.gateway.get(url);
  }
  getSDQCurrentTermData(id:number):any{
    const url = `${this.servicePath}/get-sdq-current-term-data-prt/${id}`;
    return  this.gateway.get(url);
  }
  getStudentDropdown(): any {
    const url = `${this.servicePath}/student-dropdown`;
    return  this.gateway.get(url);
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
}
