import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SearchParameter } from 'src/app/shared/models/search-param-model';
import { GatewayService } from 'src/app/shared/services/gateway';
import { StudentFilterItemModel } from './student-filter-model';
@Injectable({
  providedIn: 'root'
})
export class StudentFilterService {
  servicePath = '/student-filter';
  constructor(private gateway: GatewayService) { }
  create(model:StudentFilterItemModel):any{    
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
  getStudentDropdown(): any {
    const url = `${this.servicePath}/student-dropdown`;
    return  this.gateway.get(url);
  }
  getYearTermDropdown(): any {
    const url = `${this.servicePath}/year-term-dropdown`;
    return  this.gateway.get(url);
  }
  update(id:number,model:StudentFilterItemModel): any {
    const url = `${this.servicePath}/update/${id}`;
    return  this.gateway.update(url,model);
  }
  delete(id:number):any{
    const url = `${this.servicePath}/delete/${id}`;
    return  this.gateway.delete(url);
  }
  initial():any{
    return of(new StudentFilterItemModel())  ;
  }
  getClassroomDropdown(): any {
    const url = `${this.servicePath}/classroom-dropdown`;
    return  this.gateway.get(url);
  }
  getClassroomTypeDropdown(): any {
    const url = `${this.servicePath}/classroom-type-dropdown`;
    return  this.gateway.get(url);
  }
  
  getReportStudentFilterSumarize() {
    const url = `/report/report-student-filter-sumarize`;
    return this.gateway.getPdf(url);
  }

  getReportStudentFilterByClass() {
    const url = `/report/report-student-filter-bt-class`;

    return this.gateway.getPdf(url);
  }

  getReportStudentFilterByClassAndRoom() {
    const url = `/report/report-student-filter-by-class-and-room`;

    return this.gateway.getPdf(url);
  }

  getReportStudentFilterByRoom(termId:number,roomId:number,classId:number) {
    const url = `/report/report-student-filter-by-room`;

    return this.gateway.postPdf(url,{
      "yearTermId": termId,
      "classroomId": roomId,
      "classroomTypeId": classId
    });
  }
}
