import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { SubDistrictItemModel } from './sub-district-model';
@Injectable({
  providedIn: 'root'
})
export class SubDistrictService {
  servicePath = '/sub-district';
  constructor(private gateway: GatewayService) { }
  create(model:SubDistrictItemModel):any{    
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
  getDistrictDropdown(): any {
    const url = `${this.servicePath}/district-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:SubDistrictItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new SubDistrictItemModel())  ;
  }
}
