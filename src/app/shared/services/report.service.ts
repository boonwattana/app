import { Injectable } from "@angular/core";
import { GatewayService } from "./gateway";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private gateway: GatewayService) {}
  getRpSumarize(): any {
    const url = `/report/student-sumarize`;
    return this.gateway.get(url);
  }
  getRpByclass(): any {
    const url = `/report/student-by-class`;
    return this.gateway.get(url);
  }
  getRpByroom(): any {
    const url = `/report/student-by-room`;
    return this.gateway.get(url);
  }

  getReportEqSumarize() {
    const url = `/report/report-eq-sumarize`;
    return this.gateway.get(url);
  }

  getReportEqByRoom() {
    const url = `/report/report-eq-by-room`;
    return this.gateway.get(url);
  }

  getReportEqByClass() {
    const url = `/report/report-eq-by-class`;
    return this.gateway.get(url);
  }

  getReportEqByClassAndRoom() {
    const url = `/report/report-eq-by-class-and-room`;
    return this.gateway.get(url);
  }

  getReportHomvisitSumarize() {
    const url = `/report/report-mome-visit-sumarize`;
    return this.gateway.get(url);
  }

  getReportDepressionSumarize() {
    const url = `/report/report-depression-sumarize`;
    return this.gateway.get(url);
  }

  getReportDepressionByClass() {
    const url = `/report/report-depression-by-class`;
    return this.gateway.get(url);
  }

  getReportDepressionByClassAndRoom() {
    const url = `/report/report-depression-by-class-and-room`;
    return this.gateway.get(url);
  }

  getReportDepressionByRoom() {
    const url = `/report/report-depression-by-room`;
    return this.gateway.get(url);
  }


  getReportStudentHelpByClass() {
    const url = `/report/report-student-help-by-class`;

    return this.gateway.get(url);
  }

  getReportStudentHelpByRoom() {
    const url = `/report/report-student-help-by-room`;

    return this.gateway.get(url);
  }

  getReportStudentHelpByClassAndRoom() {
    const url = `/report/report-student-help-by-class-and-room`;

    return this.gateway.get(url);
  }

  getReportStudentScolarByClass() {
    const url = `/report/report-student-scolar-by-class`;

    return this.gateway.get(url);
  }

  getReportStudentScolarByRoom() {
    const url = `/report/report-student-scolar-by-room`;

    return this.gateway.get(url);
  }

  getReportStudentScolarByClassAndRoom() {
    const url = `/report/report-student-scolar-by-class-and-room`;

    return this.gateway.get(url);
  }

  getReportStudentSendToByClass() {
    const url = `/report/report-student-send-to-by-class`;

    return this.gateway.get(url);
  }

  getReportStudentSendToByRoom() {
    const url = `/report/report-student-send-to-by-room`;

    return this.gateway.get(url);
  }

  getReportStudentSendToByClassAndRoom() {
    const url = `/report/report-student-send-to-by-class-and-room`;

    return this.gateway.get(url);
  }
  getReportStudentSendToSumarize() {
    const url = `/report/report-student-send-to-sumarize`;

    return this.gateway.get(url);
  }
  
  getReportStressSumarize() {
    const url = `/report/report-stress-sumarize`;

    return this.gateway.get(url);
  }

  getReportStressByClass() {
    const url = `/report/report-stress-by-class`;

    return this.gateway.get(url);
  }

  getReportStressByClassAndRoom() {
    const url = `/report/report-stress-by-class-and-room`;

    return this.gateway.get(url);
  }

  getReportStressByRoom() {
    const url = `/report/report-stress-by-room`;

    return this.gateway.get(url);
  }
}
