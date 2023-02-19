import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { DistrictItemModel } from './district-model';
@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  servicePath = '/district';
  constructor(private gateway: GatewayService) { }
  create(model:DistrictItemModel):any{    
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
  getProvinceDropdown(): any {
    const url = `${this.servicePath}/province-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:DistrictItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new DistrictItemModel())  ;
  }
}
