import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InputType, SortType } from '../../constants/enum-system';
import { isNullOrUndefined } from '../../functions/values';
import { ColumnModel, OptionModel, RowIdentity, SelectItems } from '../../models/miscellaneous';
import {  Paginator, SearchCondition, SearchParameter } from '../../models/search-param-model';
import {ConfirmationService} from 'primeng/api';
import { saveAs } from 'file-saver';
import { GatewayService } from '../../services/gateway';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'm-data-table2',
  templateUrl: './m-data-table.component2.html',
  styleUrls: ['./m-data-table.component2.scss']
})
export class MDataTableComponent2 implements OnInit {
  @ViewChild('fileInput') fileInput:ElementRef;

  bindingSearchCondition:SearchCondition[] = []
  bindingOption: OptionModel;
  bindingDataSource: any[] = [];
  paginator: Paginator = { page: 0, first: 0, rows: 10, pageCount: 0 };
  totalRecord: number = 10;
  bindingColumn: any[];
  multipleSelected = [];
  searchParam = new SearchParameter();
  loading: boolean = false;
  bindingTableName:string = ''
  dataSet: any[] = [];
  bindingModuleName:string;
  canCreate:boolean= false
  canDelete:boolean = false
  @Output() searchEmit = new EventEmitter<SearchParameter>();
  constructor(private readonly confirmationService:ConfirmationService,private gateway: GatewayService,private readonly el:ElementRef,private readonly userDataService:UserDataService) { 

  }
  @Input()
  set setCanDelete(canDelete:boolean){
    this.canDelete = canDelete
  }
  @Input()
  set setCanCreate(canCreate:boolean){
    this.canCreate = canCreate
  }
  @Input()
  set tableName(table:string){
    this.bindingTableName = table
  }
  @Input()
  set moduleName(param:string){
    this.bindingModuleName = param
  }
  @Input()
  set dataSource(dataSource: any) {    
    // this.dataSet = dataSource.results
 
    
    this.bindingDataSource = dataSource?.results;
    
    this.paginator = dataSource?.paginator;
    this.totalRecord = dataSource?.paginator?.totalRecord;
    this.loading = false;
  }
  @Input()
  set removeRecord(id: number) {    
    if(id){
      this.bindingDataSource = this.bindingDataSource.filter(fl=>fl.id!=id);
    }
  }
  @Input()
  set created(row: any) {    
    if(row){
      this.bindingDataSource.unshift(row);
    }
  }
  @Input()
  set edited(row: any) {    
    if(row){
      this.bindingDataSource[this.bindingDataSource.find(fn=>fn.id==row.id).index]=row;
    }
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
  @Input()
  set searchCondition(conditions:SearchCondition[]){
    
    this.bindingSearchCondition = conditions;
  }
  @Output() createEmit = new EventEmitter();
  @Output() viewEmit = new EventEmitter<RowIdentity>();
  @Output() editEmit = new EventEmitter<RowIdentity>();
  @Output() deleteEmit = new EventEmitter<RowIdentity>();
  ngOnInit(): void {
    this.onSearch()
  }
  
  downloadFile() {
    
    this.gateway.get(`/excel/export/${this.bindingTableName}`).subscribe(result=>{
      if (result.data) {
        var blob = this.base64ToBlob(result.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        saveAs(blob, `${this.bindingTableName}.xlsx`);
      }
    })
    
}

getElementById(){
  const element = (<HTMLElement>this.el.nativeElement).querySelector(
    `#selectedFile`
    );
    this.fileInput.nativeElement.click()

}
myUploader(event:any) {
  let fileData;
  for (const obj in event.target.files) {
    const image = event.target.files[obj]
    if(image.name){
      try {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (_event) => {   
          fileData =    _event.target.result    
          
        }
      } catch (error) {
      }
    }      
  }
  this.confirmationService.confirm({
    message: 'Confirm to import?',
    accept: () => {
      const model = {
        moduleName:this.bindingTableName,
        base64:fileData
      }
      this.gateway.create(`/excel/import`,model).subscribe(result=>{
        this.onSearch()
      })
    }
  });
}
public base64ToBlob(b64Data, contentType='', sliceSize=512) {
  b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
  let byteCharacters = atob(b64Data);
  let byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, {type: contentType});
}
  onView(id: number, index: number): void {
    const row: RowIdentity = { id: id, rowIndex: index };
    this.viewEmit.emit(row);
  }
  onEdit(id: number, index: number): void {
    const row: RowIdentity = { id: id, rowIndex: index };    
    this.editEmit.emit(row);
  }
  onDelete(id: number, index: number): void {
    const row: RowIdentity = { id: id, rowIndex: index };
    this.setDefaultSort();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteEmit.emit(row);
      }
    });
  }
  onSort(header: ColumnModel): void {
    if (
      this.bindingOption.showPaginator &&
      !this.bindingOption.isAdvance &&
      !header.disabledFilter
    ) {
      if (this.bindingOption !== undefined) {
        if (!this.bindingOption.showPaginator) {
          if (header.sorting === SortType.ASC) {
            this.bindingDataSource.sort(
              (a, b) => a[header.textKey] - b[header.textKey]
            );
          } else {
            this.bindingDataSource.sort(
              (a, b) => b[header.textKey] - a[header.textKey]
            );
          }
        } else {
          this.bindingOption.columns.forEach((col) => {
            if (col.textKey !== header.textKey) {
              col.sorting = SortType.NONE;
            }
          });
        }
      }
      switch (header.sorting) {
        case SortType.ASC:
          header.sorting = SortType.DESC;
          break;
        case SortType.DESC:
          header.sorting = SortType.ASC;
          break;
        case SortType.NONE:
          header.sorting = SortType.ASC;
          break;
      }
      //  keyword :=> changing view model
      this.searchParam.sortColumns = [];
      this.searchParam.isAscs = [];
      this.searchParam.sortTable = [];
      this.searchParam.sortColumns.push(
        !isNullOrUndefined(header.sortingKey)
          ? header.sortingKey
          : header.textKey
      );
      this.searchParam.isAscs.push(header.sorting === SortType.ASC);
      if (!isNullOrUndefined(this.bindingOption)) {
        if (!this.bindingOption.showPaginator) {
          this.searchParam.paginator.rows = -1;
          this.searchParam.paginator.page = 0;
        }
      }
      this.searchParam.sortTable.push(header.tableName);
      this.onSearch()

    }
  }
  onInputSearch(){
    if(this.searchParam.paginator){
      this.searchParam.paginator.page = 0;
    }

    this.onSearch()
  }
  onSearch(){    
      
    if (!isNullOrUndefined(this.bindingOption)) {
      if (!this.bindingOption.showPaginator) {
        this.searchParam.paginator.rows = -1;
        this.searchParam.paginator.page = 0;
      }
    }
    this.bindingSearchCondition.forEach(en=>{
      if(en.inputType == InputType.ENUM){
        
        en.value = en.value
      }
    })
    this.searchParam.searchCondition = this.bindingSearchCondition
    this.searchParam.tableKey = this.bindingTableName
    this.loading = true;
    this.searchEmit.emit(this.searchParam);
  }
  onChange(e:any){
    
    this.searchParam.paginator = {
      page: 0,
      first: 0,
      rows: e.target.value,
      pageCount: this.searchParam.paginator?.pageCount,
      totalRecord: this.totalRecord,
    };
    this.setDefaultSort();
    this.onSearch()
  }
  paginate(e: any): void {    
    this.searchParam.paginator = {
      page: e.page,
      first: e.first,
      rows: e.rows,
      pageCount: this.searchParam.paginator?.pageCount,
      totalRecord: this.totalRecord,
    };
    this.setDefaultSort();
    this.onSearch()

  }
  setDefaultSort(): void {
    if (this.bindingOption.columns !== undefined) {
      const columns = this.bindingOption.columns;
      if (
        this.searchParam.isAscs.length === 0 ||
        this.searchParam.sortColumns.length === 0 ||
        this.searchParam.sortTable.length === 0
      ) {
        if (columns.some((s) => s.sorting !== SortType.NONE)) {
          const noOrdering = columns.filter(
            (f) =>
              isNullOrUndefined(f.sortingOrder) && f.sorting !== SortType.NONE
          );
          let ordering = columns.filter(
            (f) =>
              !isNullOrUndefined(f.sortingOrder) && f.sorting !== SortType.NONE
          );
          ordering = ordering.sort((a, b) =>
            a.sortingOrder > b.sortingOrder
              ? 1
              : b.sortingOrder > a.sortingOrder
              ? -1
              : 0
          );
          ordering.forEach((col, i) => {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(col.sortingKey) ? col.sortingKey : col.textKey
            );
            this.searchParam.isAscs.push(col.sorting === SortType.ASC);
            this.searchParam.sortTable.push(col.tableName);
          });
          noOrdering.forEach((col, i) => {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(col.sortingKey) ? col.sortingKey : col.textKey
            );
            this.searchParam.isAscs.push(col.sorting === SortType.ASC);
            this.searchParam.sortTable.push(col.tableName);
          });
        } else {
          this.searchParam.isAscs.push(true);
          if (!isNullOrUndefined(columns[0])) {
            this.searchParam.sortColumns.push(
              !isNullOrUndefined(columns[0].sortingKey)
                ? columns[0].sortingKey
                : columns[0].textKey
            );
          }
          this.searchParam.sortTable.push(columns[0].tableName);
        }
      }
    }
  }
  onSearchChange(){
        this.searchParam.searchCondition = this.bindingSearchCondition
        this.setDefaultSort();
        this.onSearch()
  }
  getLabelEnum(value:any,option:SelectItems[]){
    let label: string = ''  
    option.forEach(en=>{
      if(en.value == value)
      {
        label = en.label
      }
    })    
    return label

  }
}


