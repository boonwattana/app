import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { ProvinceItemModel } from './province-model';
@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  servicePath = '/province';
  constructor(private gateway: GatewayService) { }
  create(model:ProvinceItemModel):any{    
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
  getCountryDropdown(): any {
    const url = `${this.servicePath}/country-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:ProvinceItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new ProvinceItemModel())  ;
  }
}
