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
  selector: 'm-data-table-report',
  templateUrl: './m-data-table-report.component.html',
  styleUrls: ['./m-data-table-report.component.scss']
})
export class MDataTableReportComponent implements OnInit {
  @ViewChild('fileInput') fileInput:ElementRef;

  bindingSearchCondition:SearchCondition[] = []
  bindingOption: OptionModel;
  bindingDataSource: any[] = [];
  paginator: Paginator = { page: 0, first: 0, rows: 100, pageCount: 0 };
  totalRecord: number = 10;
  bindingColumn: any[];
  multipleSelected = [];
  searchParam = new SearchParameter();
  loading: boolean = false;
  bindingTableName:string = ''
  bindingModuleName:string;
  canCreate:boolean= false
  canDelete:boolean = false
  canView:boolean = false
  bindingCanImport:boolean= true
  canExport:boolean = false
  isReportClass:boolean = false
  isReportRoom:boolean = false
  isReportAll:boolean = false
  @Output() searchEmit = new EventEmitter<SearchParameter>();
  constructor(private readonly confirmationService:ConfirmationService,
    private gateway: GatewayService,
    private readonly el:ElementRef,
    private readonly userDataService:UserDataService) { 
  }

  public downloadAsPDFClass() {
    this.reportClass.emit();
  }
  public downloadAsPDFRoom() {
    this.reportRoom.emit();
  }
  public downloadAsPDFAll() {
    this.reportAll.emit();
  }
  @Input()
  set setCanDelete(canDelete:boolean){
    this.canDelete = canDelete
  }
  @Input()
  set canReportClass(bo:boolean){
    this.isReportClass = bo
  }
  @Input()
  set canReportRoom(arg:boolean){
    this.isReportRoom = arg
  }
  @Input()
  set canReportAll(arg:boolean){
    this.isReportAll = arg
  }
  @Input()
  set setCanExport(canExport:boolean){
    this.canExport = canExport
  }
  @Input()
  set setCanImport(canImport:boolean){
    if(canImport ==false){
      this.bindingCanImport = false

    }else{
      this.bindingCanImport = !this.canCreate
    }
  }
  @Input()
  set setCanCreate(canCreate:boolean){
    this.canCreate = canCreate
    if(this.bindingCanImport!=false){
      this.bindingCanImport = this.canCreate
    }
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
  @Output() reportClass = new EventEmitter();
  @Output() reportRoom = new EventEmitter();
  @Output() reportAll = new EventEmitter();
  ngOnInit(): void {
    // this.onSearch(false)
  }
  
  downloadFile() {
    this.onSearch(true)    
    this.searchParam.paginator = {page: 0, first: 1, rows: 999999999, pageCount: undefined, totalRecord: 157}
    this.gateway.list(`/excel/export/${this.bindingTableName}`,this.searchParam).subscribe(result=>{      
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
    message: 'ยืนยันการนำเข้าข้อมูล',
    accept: () => {
      const model = {
        moduleName:this.bindingTableName,
        base64:fileData
      }
      this.gateway.create(`/excel/import`,model).subscribe(result=>{
        this.onSearch(false)
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
      message: 'คุณต้องการลบข้อมูลชุดนี้ใช่หรือไม่?',
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
      this.onSearch(false)

    }
  }
  onInputSearch(){
    if(this.searchParam.paginator){
      this.searchParam.paginator.page = 0;
    }

    this.onSearch(false)
  }
  onSearch(isExport:boolean){          
    if (!isNullOrUndefined(this.bindingOption)) {
      if (!this.bindingOption.showPaginator) {
        this.searchParam.paginator.rows = 10000;
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

    if(!isExport){
      this.loading = true;
      this.searchEmit.emit(this.searchParam);
    }

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
    this.onSearch(false)

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
        this.onSearch(false)
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
  onChange(e:any){
    
    this.searchParam.paginator = {
      page: 0,
      first: 0,
      rows: e.target.value,
      pageCount: this.searchParam.paginator?.pageCount,
      totalRecord: this.totalRecord,
    };
    this.setDefaultSort();
    this.onSearch(false)
  }
  getAge(value:Date){

    if(value){
      const currentDate = new Date()
      const birthDate = new Date(value)
      const yearBirth =  birthDate.getFullYear()
      const yearCurrent = currentDate.getFullYear()
      const mounthBirth =  birthDate.getMonth()
      const monthCurrent = currentDate.getMonth()
      const dateInBirthMounth = birthDate.getUTCDate()

      const dayBirth =  birthDate.getDate()
      const dayCurrent = currentDate.getDate()
      let yearAge = yearCurrent -yearBirth
      let mountAge = monthCurrent -mounthBirth
      let ageDay = dayCurrent
      const mounthDay = this.getDayOfMounth(mounthBirth,dayBirth)
      if(mountAge == 0){
        ageDay = dayCurrent-dayBirth
        if(ageDay<0&&yearAge>0){
          yearAge--
        }
      }

      if(mountAge<0){
        yearAge--
        mountAge = 11+mountAge
        
      }
      if(mountAge>0&& (ageDay+mounthDay)>30){
        ageDay = (ageDay+mounthDay)-30
        mountAge ++
      }
      
      return `${yearAge} ปี ${mountAge} เดือน ${ageDay} วัน`

      // const diff = moment(birthDate).diff(moment(), 'milliseconds');
      // const duration = moment.duration(diff);

    }
    return ''
  }
  getDayOfMounth(mounthBirth: number,dayBirth:number) {
    switch(mounthBirth){
      case 0 :
        return  31- dayBirth
      case 1 :
        return 28- dayBirth
      case 2 :
        return  31- dayBirth
        case 3 :
          return  30- dayBirth
          case 4 :
            return  31- dayBirth
            case 5 :
              return  30- dayBirth
              case 6 :
                return  31- dayBirth
                case 7 :
                  return  31- dayBirth
                  case 8 :
                    return  30- dayBirth
                    case 9 :
                      return  31- dayBirth
                      case 10 :
                        return  30- dayBirth
                        case 11 :
                          return  31- dayBirth
                          default:
                            return 0
    }
  }
  getEqGreet(value:any){
    let des = '-'
    if(value >0 &&value <45){
      des = 'ต่ำกว่าปกติ'
    }
    if(value >= 45 &&value <= 57){
      des = 'เกณฑ์ปกติ'
    }
    if(value > 170){
      des = 'สูงกว่าปกติ'
    }
    return des
  }
  getEqGood(value:any){
    let des = '-'
    if(value >0 &&value <48){
      des = 'ต่ำกว่าปกติ'
    }
    if(value >= 48 &&value <= 58){
      des = 'เกณฑ์ปกติ'
    }
    if(value > 170){
      des = 'สูงกว่าปกติ'
    }
    return des
    
  }
  getEqHappy(value:any){
    let des = '-'
    if(value >0 &&value <40){
      des = 'ต่ำกว่าปกติ'
    }
    if(value >= 40 &&value <= 55){
      des = 'เกณฑ์ปกติ'
    }
    if(value > 55){
      des = 'สูงกว่าปกติ'
    }
    return des
    
  }
  getEqSum(value:any){
    let des = '-'
    if(value >0 &&value <140){
      des = 'ต่ำกว่าปกติ'
    }
    if(value >= 140 &&value <= 140){
      des = 'เกณฑ์ปกติ'
    }
    if(value > 170){
      des = 'สูงกว่าปกติ'
    }
    return des
    
  }
  getDepressionFrom(value:any){
    let des = '-'
    if(value == 0){
      des = 'ไม่มี'
    }
    if(value > 0){
      des = 'มีความเสี่ยง'
    }
    return des

  }
  getDepression(value:any){
    let des = '-'
    if(value == 0){
      des = 'ไม่มี'
    }
    if(value > 0){
      des = 'มีความเสี่ยง'
    }
    if(value > 7){
      des = 'ระดับน้อย'
    }
    if(value > 12){
      des = 'ระดับปานกลาง'
    }
    if(value > 18){
      des = 'ระดับรุนแรง'
    }
    return des

  }
  getSucied(value:any){
    let des = '-'
    if(value == 0){
      des = 'ไม่มี'
    }
    if(value > 0){
      des = 'ระดับน้อย'
    }
    if(value > 8){
      des = 'ระดับปานกลาง'
    }
    if(value > 16){
      des = 'ระดับรุนแรง'
    }

    return des

  }
  getStress(value:any){
    let des = '-'
    // if(value == 0){
    //   des = 'ไม่มี'
    // }
    if(value > 0){
      des = 'ระดับความเครียดน้อย'
    }
    if(value > 23){
      des = 'ระดับความเครียดปานกลาง'
    }
    if(value > 41){
      des = 'มีความเครียดในระดับสูง'
    }
    if(value > 61){
      des = 'มีระดับความเครียดรุนแรง'
    }
    return des

  }
  getTime(timeStr:string){
    if(timeStr){
      const timeArr = timeStr.split(':')
      return `${timeArr[0]}:${timeArr[1]}`
    }
    return ''

  }
  // getValue(type:string,value:any){
  //   if(type =='DATE'){
  //     this.g
  //   }
  //   return value
  // }
}



