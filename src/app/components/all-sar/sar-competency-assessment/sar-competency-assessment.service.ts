import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { SarCompetencyAssessmentItemModel } from './sar-competency-assessment-model';
@Injectable({
  providedIn: 'root'
})
export class SarCompetencyAssessmentService {
  servicePath = '/sar-competency-assessment';
  constructor(private gateway: GatewayService) { }
  create(model:SarCompetencyAssessmentItemModel):any{    
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
  update(id:number,model:SarCompetencyAssessmentItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new SarCompetencyAssessmentItemModel())  ;
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
}
