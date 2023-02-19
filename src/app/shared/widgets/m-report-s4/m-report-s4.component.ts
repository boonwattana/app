import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InputType, SortType } from '../../constants/enum-system';
import { isNullOrUndefined } from '../../functions/values';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from '../../models/miscellaneous';
import {  Paginator, SearchCondition, SearchParameter } from '../../models/search-param-model';
import {ConfirmationService} from 'primeng/api';
import { saveAs } from 'file-saver';
import { GatewayService } from '../../services/gateway';
import { UserDataService } from '../../services/user-data.service';
import { ReportModel } from '../../models/report.model';
@Component({
  selector: 'm-report-s4',
  templateUrl: './m-report-s4.component.html',
  styleUrls: ['./m-report-s4.component.scss']
})
export class MReportS4Component implements OnInit {

  bindingOption: OptionModel;
  bindingDataSource: any[] = [];
  bindingColumn: any[];
  bindingModuleName:string;

  @Output() searchEmit = new EventEmitter<SearchParameter>();
  constructor(private readonly confirmationService:ConfirmationService,private gateway: GatewayService,private readonly el:ElementRef,private readonly userDataService:UserDataService) { 

  }
  ngOnInit(): void {
  }
  @Input()
  set moduleName(param:string){
    this.bindingModuleName = param
  }
  @Input()
  set dataSource(dataSource: ReportModel[]) {    
    this.bindingDataSource = dataSource
  }
  @Input()
  set option(opt: OptionModel) {    
    var column = [];
    opt.columns.forEach((element) => {
      column.push(element.textKey);
    });
    this.bindingColumn = column;
    this.bindingOption = opt;

  }
    



}


