import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { DemoItemModel } from './demo-model';
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  servicePath = '/demo';
  constructor(private gateway: GatewayService) { }
  create(model:DemoItemModel):any{    
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
  getDashboard(): any {
    const url = `${this.servicePath}/dashboard`;
    return  this.gateway.get(url);
  }
  getDemoDropdown(): any {
    const url = `${this.servicePath}/dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:DemoItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new DemoItemModel())  ;
  }
}
