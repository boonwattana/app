import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { SarCrudAssessmentItemModel } from './sar-crud-assessment-model';
@Injectable({
  providedIn: 'root'
})
export class SarCrudAssessmentService {
  servicePath = '/sar-crud-assessment';
  constructor(private gateway: GatewayService) { }
  create(model:SarCrudAssessmentItemModel):any{    
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
  update(id:number,model:SarCrudAssessmentItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new SarCrudAssessmentItemModel())  ;
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
}
