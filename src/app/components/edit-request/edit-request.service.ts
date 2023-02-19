import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EditRequestStatus } from 'src/app/shared/constants/enum-system';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { EditRequestItemModel } from './edit-request-model';
@Injectable({
  providedIn: 'root'
})
export class EditRequestService {
  servicePath = '/edit-request';
  constructor(private gateway: GatewayService) { }
  create(model:EditRequestItemModel):any{    
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
  getEditFieldDropdown(): any {
    const url = `${this.servicePath}/edit-field-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:EditRequestItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  approve(id:number,model:EditRequestItemModel): any {
    const url = `${this.servicePath}/approve/${id}`;
    return  this.gateway.update(url,model);
  }
  reject(id:number,model:EditRequestItemModel): any {
    const url = `${this.servicePath}/reject/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    const model = new  EditRequestItemModel()
    model.editRequestStatus = EditRequestStatus.REQUEST
    return of(model)  ;
  }
}
