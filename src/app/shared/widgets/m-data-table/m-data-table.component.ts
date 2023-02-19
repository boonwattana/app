import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { InputType, SortType } from "../../constants/enum-system";
import { isNullOrUndefined } from "../../functions/values";
import {
  ColumnModel,
  OptionModel,
  RowIdentity,
  SelectItems,
} from "../../models/miscellaneous";
import {
  Paginator,
  SearchCondition,
  SearchParameter,
} from "../../models/search-param-model";
import { ConfirmationService, MessageService } from "primeng/api";
import { saveAs } from "file-saver";
import { GatewayService } from "../../services/gateway";
import { UserDataService } from "../../services/user-data.service";
import { forkJoin } from "rxjs";
import { SelectFieldOption } from "../../models/configs";
@Component({
  selector: "m-data-table",
  templateUrl: "./m-data-table.component.html",
  styleUrls: ["./m-data-table.component.scss"],
})
export class MDataTableComponent implements OnInit,OnChanges {
  @ViewChild("fileInput") fileInput: ElementRef;

  bindingSearchCondition: SearchCondition[] = [];
  bindingOption: OptionModel;
  bindingDataSource: any[] = [];
  paginator: Paginator = { page: 0, first: 0, rows: 10, pageCount: 0 };
  totalRecord: number = 10;
  bindingColumn: any[];
  multipleSelected = [];
  searchParam = new SearchParameter();
  loading: boolean = false;
  bindingTableName: string = "";
  bindingModuleName: string;
  canCreate: boolean = false;
  canDelete: boolean = false;
  canView: boolean = false;
  canEdit: boolean = true;
  bindingCanImport: boolean = true;
  canExport: boolean = true;
  isReportClass: boolean = false;
  isReportRoom: boolean = false;
  isReportAll: boolean = false;
  display: boolean = false;
  displayField: boolean = false;
  
  yearTermId: number = 0;
  classId: number = 0;
  roomId: number = 0;
  roomOption: SelectItems[] = [];
  classOption: SelectItems[] = [];
  yearTermOption: SelectItems[] = [];
  canReport: boolean = false;
  reportType: string = "";
  reportName: string = "";
  requiredClass: boolean = false;
  requiredRoom: boolean = false;
  specialReport: boolean = false;
  special: string = "";
  showRoom: boolean = true;
  showClass: boolean = true;
  customYearTerm: boolean = false;
  year: string = "";
  term: string = "";
  isTeacher: boolean;
  canExportTH:boolean = false
  bindingFieldOption:SelectFieldOption[] =[]
  @Output() searchEmit = new EventEmitter<SearchParameter>();
  constructor(
    private readonly confirmationService: ConfirmationService,
    private gateway: GatewayService,
    private readonly el: ElementRef,
    private messageService: MessageService,
    private readonly userDataService: UserDataService,
    private readonly renderer:Renderer2
  ) {
    this.yearTermId = this.userDataService.getTermId();
    this.classId = this.userDataService.getClassroomTypeId();
    this.roomId = this.userDataService.getClassroomId();
    this.isTeacher = this.userDataService.isTeacher();
  }
  ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
      this.changeColour()
    }, 50);
  }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.changeColour()
  //   }, 1100);
    
  // }
  @ViewChild("pdfTable")
  pdfTable!: ElementRef;
  @Input()
  set setBindingFieldOption(arg: SelectFieldOption[]) {
    this.bindingFieldOption = arg;
  }
  @Input()
  set setCustomYearTerm(arg: boolean) {
    this.customYearTerm = arg;
  }
  @Input()
  set setShowRoom(arg: boolean) {
    this.showRoom = arg;
  }

  @Input()
  set setShowClass(arg: boolean) {
    this.showClass = arg;
  }
  @Input()
  set setCanExportTH(arg: boolean) {
    this.canExportTH = arg;
  }


  @Input()
  set setSpecialReport(arg: boolean) {
    this.specialReport = arg;
  }
  @Input()
  set setRequiredClass(arg: boolean) {
    this.requiredClass = arg;
  }
  @Input()
  set setRequiredRoom(arg: boolean) {
    this.requiredRoom = arg;
  }

  @Input()
  set setCanDelete(canDelete: boolean) {
    this.canDelete = canDelete;
  }
  @Input()
  set setReportName(name: string) {
    this.reportName = name;
  }
  @Input()
  set setCanReport(canReport: boolean) {
    this.canReport = canReport;
  }
  @Input()
  set canReportClass(bo: boolean) {
    this.isReportClass = bo;
  }
  @Input()
  set canReportRoom(arg: boolean) {
    this.isReportRoom = arg;
  }
  @Input()
  set canReportAll(arg: boolean) {
    this.isReportAll = arg;
  }
  @Input()
  set setCanExport(canExport: boolean) {
    this.canExport = canExport;
  }
  @Input()
  set setCanEdit(edit: boolean) {
    this.canEdit = edit;
  }

  @Input()
  set setCanImport(canImport: boolean) {
    if (canImport == false) {
      this.bindingCanImport = false;
    } else {
      this.bindingCanImport = !this.canCreate;
    }
  }
  @Input()
  set setCanCreate(canCreate: boolean) {
    this.canCreate = canCreate;
    if (this.bindingCanImport != false) {
      this.bindingCanImport = this.canCreate;
    }
  }

  @Input()
  set tableName(table: string) {
    this.bindingTableName = table;
  }
  @Input()
  set moduleName(param: string) {
    this.bindingModuleName = param;
    this.restoreSearchCondition();
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
    if (id) {
      this.bindingDataSource = this.bindingDataSource.filter(
        (fl) => fl.id != id
      );
    }
  }
  @Input()
  set created(row: any) {
    if (row) {
      this.bindingDataSource.unshift(row);
    }
  }
  @Input()
  set edited(row: any) {
    if (row) {
      this.bindingDataSource[
        this.bindingDataSource.find((fn) => fn.id == row.id).index
      ] = row;
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
  set searchCondition(conditions: SearchCondition[]) {
      this.bindingSearchCondition = conditions;
      this.restoreSearchCondition()
  }
  @Output() createEmit = new EventEmitter();
  @Output() viewEmit = new EventEmitter<RowIdentity>();
  @Output() editEmit = new EventEmitter<RowIdentity>();
  @Output() deleteEmit = new EventEmitter<RowIdentity>();
  @Output() reportClass = new EventEmitter();
  @Output() reportRoom = new EventEmitter();
  @Output() reportAll = new EventEmitter();
  ngOnInit(): void {
    this.onSearch(false);
    this.onSynceDataOption();
  
  }
  changeColour() {
    const element = (<HTMLElement>this.el.nativeElement).querySelectorAll(
      `.display-td`
      );
      element.forEach(el=>{        
        if(el.innerHTML.trim() == 'ไม่เสร็จสิ้น'){
          this.renderer.addClass(el,'red')
        }
        if(el.innerHTML.trim() == 'เสร็จสิ้น'){          
          this.renderer.addClass(el,'green')
        }
        
      })
      
  }
  
  restoreSearchCondition() {

    if (localStorage.getItem(this.bindingModuleName)) {
      const searchParamNew: SearchParameter = JSON.parse(
        localStorage.getItem(this.bindingModuleName)
      ) as SearchParameter;
     const newBindingCondition =  this.bindingSearchCondition.map(el=>{
       return{
        ...el,
        value : this.getValueSearch(searchParamNew.searchCondition,el.feildName,el.value)
       } 
      })
      // this.bindingSearchCondition = searchParamNew.searchCondition.map(m=>{
      //   return{...}
      // });
      this.bindingSearchCondition = newBindingCondition
      
      this.paginator = searchParamNew.paginator;
      this.searchParam = searchParamNew;
    }
  }
  getValueSearch(searchCondition: SearchCondition[], feildName: string,v:any): any {
    if(v){
      return v
    }
    const value = searchCondition.find(el=>el.feildName==feildName)?.value
    return value
    
  }
  getAction(arg: any) {
    if (arg) {
      return `เสร็จสิ้น`;
    }
    return `ไม่เสร็จสิ้น`;
  }
  onSynceDataOption() {
    const servicePath = "/report";
    const urlRoom = `${servicePath}/classroom-dropdown`;
    const urlClass = `${servicePath}/classroom-type-dropdown`;
    const urlYearTerm = `${servicePath}/year-term-dropdown`;
    forkJoin([
      this.gateway.get(urlRoom),
      this.gateway.get(urlClass),
      this.gateway.get(urlYearTerm),
    ]).subscribe(([roomOption, classOption, yearTermOption]) => {
      [
        (this.roomOption = roomOption as SelectItems[]),
        (this.classOption = classOption as SelectItems[]),
        (this.yearTermOption = yearTermOption as SelectItems[]),
      ];
    }),
      (error) => {};
  }
  showOptionField(){
    this.displayField = !this.displayField
  }
  downloadFileTh() {
    this.onSearch(true);
    this.searchParam.paginator = {
      page: 0,
      first: 1,
      rows: 999999999,
      pageCount: undefined,
      totalRecord: 157,
    };
    this.gateway
      .listExcelTh(`/excel/export-th/${this.bindingTableName}`,this.searchParam,this.bindingFieldOption)
      .subscribe((result) => {
        if (result.data) {
          var blob = this.base64ToBlob(
            result.data,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          saveAs(blob, `${this.bindingTableName}.xlsx`);
        }
      });
  }
  downloadFile() {
    this.onSearch(true);
    this.searchParam.paginator = {
      page: 0,
      first: 1,
      rows: 999999999,
      pageCount: undefined,
      totalRecord: 157,
    };
    this.gateway
      .list(`/excel/export/${this.bindingTableName}`, this.searchParam)
      .subscribe((result) => {
        if (result.data) {
          var blob = this.base64ToBlob(
            result.data,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          saveAs(blob, `${this.bindingTableName}.xlsx`);
        }
      });
  }

  getElementById() {
    const element = (<HTMLElement>this.el.nativeElement).querySelector(
      `#selectedFile`
    );
    this.fileInput.nativeElement.click();
  }
  myUploader(event: any) {
    let fileData;
    for (const obj in event.target.files) {
      const image = event.target.files[obj];
      if (image.name) {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            fileData = _event.target.result;
          };
        } catch (error) {}
      }
    }
    this.confirmationService.confirm({
      message: "ยืนยันการนำเข้าข้อมูล",
      accept: () => {
        const model = {
          moduleName: this.bindingTableName,
          base64: fileData,
        };
        this.gateway.create(`/excel/import`, model).subscribe((result) => {
          this.onSearch(false);
        });
      },
    });
  }
  public base64ToBlob(b64Data, contentType = "", sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ""); //IE compatibility...
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
    return new Blob(byteArrays, { type: contentType });
  }
  onView(id: number, index: number,data:any): void {
    const cleanId = id??0
    const row: RowIdentity = { id: cleanId, rowIndex: index,data:data };
    this.viewEmit.emit(row);
  }
  onEdit(id: number, index: number,data:any): void {
    const cleanId = id??0
    const row: RowIdentity = { id: cleanId, rowIndex: index,data:data };
    this.editEmit.emit(row);
  }
  onDelete(id: number, index: number): void {
    const row: RowIdentity = { id: id, rowIndex: index };
    this.setDefaultSort();
    this.confirmationService.confirm({
      message: "คุณต้องการลบข้อมูลชุดนี้ใช่หรือไม่?",
      accept: () => {
        this.deleteEmit.emit(row);
      },
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
      this.onSearch(false);
    }
  }
  onInputSearch() {
    if (this.searchParam.paginator) {
      this.searchParam.paginator.page = 0;
    }

    this.onSearch(false);
  }
  onSearch(isExport: boolean) {
    if (!isNullOrUndefined(this.bindingOption)) {
      if (!this.bindingOption.showPaginator) {
        this.searchParam.paginator.rows = -1;
        this.searchParam.paginator.page = 0;
      }
    }
    this.bindingSearchCondition.forEach((en) => {
      if (en.inputType == InputType.ENUM) {
        en.value = en.value;
      }
    });
    this.searchParam.searchCondition = this.bindingSearchCondition;
    this.searchParam.tableKey = this.bindingTableName;
    if (!isExport) {
      this.loading = true;
      localStorage.setItem(
        this.bindingModuleName,
        JSON.stringify(this.searchParam)
      );

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
    this.onSearch(false);
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
  onSearchChange() {
    this.searchParam.searchCondition = this.bindingSearchCondition;
    this.setDefaultSort();
    this.onSearch(false);
  }
  getLabelEnum(value: any, option: SelectItems[]) {
    let label: string = "";
    option.forEach((en) => {
      if (en.value == value) {
        label = en.label;
      }
    });
    return label;
  }
  onChange(e: any) {
    this.searchParam.paginator = {
      page: 0,
      first: 0,
      rows: e.target.value,
      pageCount: this.searchParam.paginator?.pageCount,
      totalRecord: this.totalRecord,
    };
    this.setDefaultSort();
    this.onSearch(false);
  }
  getAge(value: Date) {
    if(!value){
      return ''
    }
    const dob = new Date(value)
    // if (value) {
    //   const currentDate = new Date();
    //   const birthDate = new Date(value);
    //   const yearBirth = birthDate.getFullYear();
    //   const yearCurrent = currentDate.getFullYear();
    //   const mounthBirth = birthDate.getMonth();
    //   const monthCurrent = currentDate.getMonth();
    //   const dateInBirthMounth = birthDate.getUTCDate();

    //   const dayBirth = birthDate.getDate();
    //   const dayCurrent = currentDate.getDate();
    //   let yearAge = yearCurrent - yearBirth;
    //   let mountAge = monthCurrent - mounthBirth;
    //   let ageDay = dayCurrent;
    //   const mounthDay = this.getDayOfMounth(mounthBirth, dayBirth);
    //   if (mountAge == 0) {
    //     ageDay = dayCurrent - dayBirth;
    //     if (ageDay < 0 && yearAge > 0) {
    //       yearAge--;
    //     }
    //   }

    //   if (mountAge < 0) {
    //     yearAge--;
    //     mountAge = 11 + mountAge;
    //   }
    //   if (mountAge > 0 && ageDay + mounthDay > 30) {
    //     ageDay = ageDay + mounthDay - 30;
    //     mountAge++;
    //   }

    //   return `${yearAge} ปี ${mountAge} เดือน ${ageDay} วัน`;

    //   // const diff = moment(birthDate).diff(moment(), 'milliseconds');
    //   // const duration = moment.duration(diff);
    // }
    // return "";
    var today = today || new Date(), 
    result = { 
      years: 0, 
      months: 0, 
      days: 0, 
      toString: function() { 
        return (this.years ? this.years + ' ปี ' : '') 
          + (this.months ? this.months + ' เดือน ' : '') 
          + (this.days ? this.days + ' วัน' : '');
      }
    };
    result.months = 
      ((today.getFullYear() * 12) + (today.getMonth() + 1))
      - ((dob.getFullYear() * 12) + (dob.getMonth() + 1));
    if (0 > (result.days = today.getDate() - dob.getDate())) {
        var y = today.getFullYear(), m = today.getMonth();
        m = (--m < 0) ? 11 : m;
        result.days += 
          [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m] 
            + (((1 == m) && ((y % 4) == 0) && (((y % 100) > 0) || ((y % 400) == 0))) 
                ? 1 : 0);
        --result.months;
    }
    result.years = (result.months - (result.months % 12)) / 12;
    result.months = (result.months % 12);
    return result;
  }
  getDayOfMounth(mounthBirth: number, dayBirth: number) {
    switch (mounthBirth) {
      case 0:
        return 31 - dayBirth;
      case 1:
        return 28 - dayBirth;
      case 2:
        return 31 - dayBirth;
      case 3:
        return 30 - dayBirth;
      case 4:
        return 31 - dayBirth;
      case 5:
        return 30 - dayBirth;
      case 6:
        return 31 - dayBirth;
      case 7:
        return 31 - dayBirth;
      case 8:
        return 30 - dayBirth;
      case 9:
        return 31 - dayBirth;
      case 10:
        return 30 - dayBirth;
      case 11:
        return 31 - dayBirth;
      default:
        return 0;
    }
  }
  getEqGreet(value: any) {
    let des = "-";
    if (value > 0 && value < 45) {
      des = "ต่ำกว่าปกติ";
    }
    if (value >= 45 && value <= 57) {
      des = "เกณฑ์ปกติ";
    }
    if (value > 170) {
      des = "สูงกว่าปกติ";
    }
    return des;
  }
  getEqGood(value: any) {
    let des = "-";
    if (value > 0 && value < 48) {
      des = "ต่ำกว่าปกติ";
    }
    if (value >= 48 && value <= 58) {
      des = "เกณฑ์ปกติ";
    }
    if (value > 170) {
      des = "สูงกว่าปกติ";
    }
    return des;
  }
  getEqHappy(value: any) {
    let des = "-";
    if (value > 0 && value < 40) {
      des = "ต่ำกว่าปกติ";
    }
    if (value >= 40 && value <= 55) {
      des = "เกณฑ์ปกติ";
    }
    if (value > 55) {
      des = "สูงกว่าปกติ";
    }
    return des;
  }
  getEqSum(value: any) {
    let des = "-";
    if (value > 0 && value < 140) {
      des = "ต่ำกว่าปกติ";
    }
    if (value >= 140 && value <= 140) {
      des = "เกณฑ์ปกติ";
    }
    if (value > 170) {
      des = "สูงกว่าปกติ";
    }
    return des;
  }
  getDepressionFrom(value: any) {
    let des = "-";
    if (value == 0) {
      des = "ไม่มี";
    }
    if (value > 0) {
      des = "มีความเสี่ยง";
    }
    return des;
  }
  getDepression(sumvalue: any) {
    if(sumvalue<7){
      return 'ไม่มี'
    }
    if(sumvalue>=7&&sumvalue<=12){
      return 'ระดับน้อย'
    }
    if(sumvalue>=13&&sumvalue<=18){
      return 'ระดับปานกลาง'
    }
    if(sumvalue>=19){
      return 'ระดับรุนแรง'
    }
    return ''
  }
  getSucied(sumvalue: any) {
    if(sumvalue<1){
      return 'ไม่มี'
    }
    if(sumvalue>=1&&sumvalue<=8){
      return 'ระดับน้อย'
    }
    if(sumvalue>=9&&sumvalue<=16){
      return 'ระดับปานกลาง'
    }
    if(sumvalue>=17){
      return 'ระดับรุนแรง'
    }
    return ''
  }
  getStress(value: any) {
    let des = "-";
    // if(value == 0){
    //   des = 'ไม่มี'
    // }
    if (value > 0) {
      des = "ระดับความเครียดน้อย";
    }
    if (value > 23) {
      des = "ระดับความเครียดปานกลาง";
    }
    if (value > 41) {
      des = "มีความเครียดในระดับสูง";
    }
    if (value > 61) {
      des = "มีระดับความเครียดรุนแรง";
    }
    return des;
  }
  getTime(timeStr: string) {
    if (timeStr) {
      const timeArr = timeStr.split(":");
      return `${timeArr[0]}:${timeArr[1]}`;
    }
    return "";
  }
  showDialogPdf() {
    this.display = !this.display;
  }
  downloadAsPDFNormal() {
    this.special = "";
    this.downloadAsPDFBy();
  }
  downloadAsPDFBy() {
    if (this.roomId) {
      if (!this.classId) {
        this.messageService.add({
          severity: "error",
          summary: "โปรดเลือกระดับชั้น",
        });
        return;
      }
    }
    this.reportType = "ALL";
    if (this.classId) {
      this.reportType = "CLASS";
      if (this.roomId) {
        this.reportType = "ROOM";
      }
    }
    if (this.requiredClass) {
      if (!this.classId) {
        this.messageService.add({
          severity: "error",
          summary: "โปรดเลือกระดับชั้น",
        });
        return;
      }
    }
    if (this.requiredRoom) {
      if (!this.roomId) {
        this.messageService.add({
          severity: "error",
          summary: "โปรดเลือกห้อง",
        });
        return;
      }
    }

    const servicePath = "/report";
    const url = `${servicePath}/download-report`;
    this.gateway
      .postPdf(url, {
        yearTermId: this.yearTermId,
        classId: this.classId,
        roomId: this.roomId,
        reportType: this.reportType,
        reportName: this.reportName,
        special: this.special,
        year: this.year,
        term: this.term,
      })
      .subscribe((result) => {
        this.downloadAsPDF(result);
      });
  }
  downloadAsPDFAll() {
    const servicePath = "/report";
    const url = `${servicePath}/download-report`;
    this.gateway
      .postPdf(url, {
        yearTermId: this.yearTermId,
        classId: this.classId,
        roomId: this.roomId,
        reportType: "ALL",
        reportName: this.reportName,
      })
      .subscribe((result) => {
        this.downloadAsPDF(result);
      });
  }
  downloadAsPDFSpecial() {
    this.special = "GROUP";
    this.downloadAsPDFBy();
  }
  downloadAsPDF(result: any) {

    if (!result.error) {
      let blob = new Blob([result], { type: "application/pdf" });
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == "undefined") {
        alert("Please disable your Pop-up blocker and try again.");
      }
    }
  }
  getDateBuddha(date:any){
    if(date){
      let june = new Date(date)
      // const month  =june.tz('Asia/Tokyo').toLocaleString('dd/mm/yyy')
      const month  =june.getMonth()
      const year  =june.getFullYear()
      const day  =june.getDate()
      if(year){        
        return `${day.toString().length==1?`0${day}`:(day)}/${(+month+1).toString().length==1?`0${+month+1}`:(+month+1)}/${+year+543}`

      }else{
        return ''
      }
    }
    return ''
  }
}
