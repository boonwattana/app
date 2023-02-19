import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { forkJoin } from "rxjs";
import { SelectItems } from "src/app/shared/models/miscellaneous";
import { BaseItemComponent } from "src/app/shared/component/base-item/base-item.component";
import { BaseItemInterface } from "src/app/shared/interface/base-item-interface";
import { StudentFilterItemModel } from "../student-filter-model";
import { StudentFilterService } from "../student-filter.service";

@Component({
  selector: "student-filter-item",
  templateUrl: "./student-filter-item.component.html",
  styleUrls: ["./student-filter-item.component.scss"],
})
export class StudentFilterItemComponent
  extends BaseItemComponent<StudentFilterItemModel>
  implements BaseItemInterface
{
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private readonly service: StudentFilterService,
    router: Router,
    route: ActivatedRoute,
    private readonly messageService: MessageService
  ) {
    super(el, renderer, router, route);
  }
  studentDropdown: SelectItems[] = [];
  yearTermDropdown: SelectItems[] = [];
  lernStatusDropdown: SelectItems[] = [];
  healtyStatusDropdown: SelectItems[] = [];
  sexualStatusDropdown: SelectItems[] = [];
  drugStatusDropdown: SelectItems[] = [];
  gameStatusDropdown: SelectItems[] = [];
  economicStatusDropdown: SelectItems[] = [];
  securityStatusDropdown: SelectItems[] = [];
  specialStatusDropdown: SelectItems[] = [];
  electronicStatusDropdown: SelectItems[] = [];
  formValidate: boolean = true;
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    if (this.isUpdateMode) {
      this.getById();
    } else {
      this.setInitialCreatingData();
    }
    this.onAsyncRunner();
  }

  onEnumLoader(): void {
    // this.lernStatusDropdown = this.dropdownService.getLernStatusDropdown()
    // this.healtyStatusDropdown = this.dropdownService.getHealtyStatusDropdown()
    // this.sexualStatusDropdown = this.dropdownService.getSexualStatusDropdown()
    // this.drugStatusDropdown = this.dropdownService.getDrugStatusDropdown()
    // this.gameStatusDropdown = this.dropdownService.getGameStatusDropdown()
    // this.economicStatusDropdown = this.dropdownService.getEconomicStatusDropdown()
    // this.securityStatusDropdown = this.dropdownService.getSecurityStatusDropdown()
    // this.specialStatusDropdown = this.dropdownService.getSpecialStatusDropdown()
    // this.electronicStatusDropdown = this.dropdownService.getElectronicStatusDropdown()
  }
  getById(): void {
    this.service.getItem(this.id).subscribe((result) => {
      if (result) {
        this.isUpdateMode = result.isUpdateMode;
        this.model = result;
      }

      this.onAsyncRunner(result);
    });
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader();

    forkJoin(
      this.service.getStudentDropdown(),
      this.service.getYearTermDropdown()
    ).subscribe(([studentDropdown, yearTermDropdown]) => {
      [
        (this.studentDropdown = studentDropdown as SelectItems[]),
        (this.yearTermDropdown = yearTermDropdown as SelectItems[]),
      ];
    }),
      (error) => {};
  }
  async setInitialCreatingData() {
    this.service.initial().subscribe((result) => {
      this.model = result;
      this.model.lernStatus = 1
      this.model.healtyStatus = 1
      this.model.sexualStatus = 1
      this.model.drugStatus = 1
      this.model.gameStatus = 1
      this.model.economicStatus = 1
      this.model.securityStatus = 1
      this.model.specialStatus = 1
      this.model.electronicStatus = 1
      
    });
  }
  onSave(): void {
    this.calSum();
    this.onSubmit(this.validateField() && this.customValidate());
  }
  calSum() {
    this.model.summarize = this.calSumLabel([
      this.model.electronicStatus,
      this.model.lernStatus,
      this.model.healtyStatus,
      this.model.sexualStatus,
      this.model.drugStatus,
      this.model.gameStatus,
      this.model.economicStatus,
      this.model.securityStatus,
      this.model.specialStatus,
    ]);
  }
  calSumLabel(values: number[]): number {
    let value: number = 0;
    values.forEach((el) => {
      if (el > value) {
        value = el;
      }
    });
    return value;
  }
  ngOnInit(): void {
    this.setInitialCreatingData();
  }
  async onSubmit(isValid: boolean) {
    if (isValid) {
      this.model.summarize = this.getSumarize();
      if (this.isUpdateMode) {
        this.service.update(this.id, this.model).subscribe((value) => {
          this.backTolist();
        });
      } else {
        this.service.create(this.model).subscribe((value) => {
          this.backTolist();
        });
      }
    } else {
      this.messageService.add({
        severity: "error",
        summary: "ท่านยังกรอกข้อมูลไม่ครบถ้วน",
        detail: "",
      });
    }
  }
  getSumarize(): number {
    let sum = 1;
    if (
      this.model.lernStatus == 2 ||
      this.model.healtyStatus == 2 ||
      this.model.sexualStatus == 2 ||
      this.model.drugStatus == 2 ||
      this.model.gameStatus == 2 ||
      this.model.economicStatus == 2 ||
      this.model.securityStatus == 2 ||
      this.model.specialStatus == 2 ||
      this.model.electronicStatus == 2
    ) {
      sum = 2;
    }
    if (
      this.model.lernStatus == 3 ||
      this.model.healtyStatus == 3 ||
      this.model.sexualStatus == 3 ||
      this.model.drugStatus == 3 ||
      this.model.gameStatus == 3 ||
      this.model.economicStatus == 3 ||
      this.model.securityStatus == 3 ||
      this.model.specialStatus == 3 ||
      this.model.electronicStatus == 3
    ) {
      sum = 3;
    }
    return sum;
  }
  backTolist() {
    this.toList("student-filter");
  }
  pageEdit() {
    const infoId = this.router.url.split("/").reverse()[0];
    this.toItem("student-filter", +infoId, false);
  }
  validateState(key: string, count: number, mainKey: string) {
    let showValidate = false;
    for (let i = 1; i <= count; i++) {
      if (this.model[`${key}${i}`]) {
        showValidate = true;
      }
    }
    return !showValidate && !(this.model[mainKey] == 1 || !this.model[mainKey]);
  }
  clearValue(key: string, count: number) {
    for (let i = 1; i <= count; i++) {
      if (this.model[`${key}${i}`]) {
        this.model[`${key}${i}`] = false;
      }
    }
  }
  validateSDQ() {
    let valid = true;
    const keys = [
      "socialStatus",
      "sumarizeFeelingStatus",
      "relationStatus",
      "notStayStatus",
      "behaviorStatus",
      "feelingStatus",
    ];
    keys.forEach((el) => {
      if (!this.model[el]) {
        valid = false;
      }
    });
    return !valid;
  }
  customValidate() {
    let valid = true;
    const validList = [
      this.model.lernStatus,
      this.model.healtyStatus,
      this.model.sexualStatus,
      this.model.drugStatus,
      this.model.gameStatus,
      this.model.economicStatus,
      this.model.securityStatus,
      this.model.specialStatus,
      this.model.electronicStatus,
      !this.validateSDQ(),
      !this.validateState("electronic", 4, "electronicStatus"),
      !this.validateState("special", 11, "specialStatus"),
      !this.validateState("security", 13, "securityStatus"),
      !this.validateState("economic", 6, "economicStatus"),
      !this.validateState("game", 12, "gameStatus"),
      !this.validateState("drug", 13, "drugStatus"),
      !this.validateState("sexual", 10, "sexualStatus"),
      !this.validateState("healty", 9, "healtyStatus"),
      !this.validateState("lern", 24, "lernStatus"),
    ];
    validList.forEach((el) => {
      if (!el) {
        valid = false;
      }
    });
    return valid;
  }
  onLernChange(){
   const keys1:string[]=['lern1','lern3','lern5','lern7','lern9','lern11','lern13','lern15','lern17','lern18','lern19','lern20','lern21','lern22','lern23','lern24']
   const keys2:string[] = ['lern2','lern4','lern6','lern8','lern10','lern12','lern14','lern16']
    let isAssign1 = false
    keys1.forEach(el=>{
      if(this.model[el]){
        isAssign1 = true
      }
    })
    if(isAssign1){
      this.model.lernStatus = 2
    }
    let isAssign2 = false
    keys2.forEach(el=>{
      if(this.model[el]){
        isAssign2 = true
      }
    })
    if(isAssign2){
      this.model.lernStatus = 3
    }else{
      this.model.lernStatus = 2
    }
    if(!isAssign2&&!isAssign1){
      this.model.lernStatus = 1
    }
  }
   onHealChange(){
   const keys1:string[]=['healty1','healty3','healty5']
   const keys2:string[] = ['healty2','healty4','healty6','healty7','healty8','healty9']
    let isAssign1 = false
    keys1.forEach(el=>{
      if(this.model[el]){
        isAssign1 = true
      }
    })
    if(isAssign1){
      this.model.healtyStatus = 2
    }
    let isAssign2 = false
    keys2.forEach(el=>{
      if(this.model[el]){
        isAssign2 = true
      }
    })
    if(isAssign2){
      this.model.healtyStatus = 3
    }else{
      this.model.healtyStatus = 2
    }
    if(!isAssign2&&!isAssign1){
      this.model.healtyStatus = 1
    }
  }
  onSexsualChange(){
    const keys1:string[]=['sexual1','sexual3','sexual5']
    const keys2:string[] = ['sexual2','sexual4','sexual6','sexual7','sexual8','sexual9','sexual10']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.sexualStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.sexualStatus = 3
     }else{
       this.model.sexualStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.sexualStatus = 1
     }
   }
   onDrugChange(){
    const keys1:string[]=['drug1','drug4','drug6','drug8','drug10','drug12','drug13']
    const keys2:string[] = ['drug2','drug3','drug5','drug7','drug9','drug11']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.drugStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.drugStatus = 3
     }else{
       this.model.drugStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.drugStatus = 1
     }
   }
   onGameChange(){
    const keys1:string[]=['game1','game3','game5','game7','game9','game11']
    const keys2:string[] = ['game2','game4','game6','game8','game10','game12']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.gameStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.gameStatus = 3
     }else{
       this.model.gameStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.gameStatus = 1
     }
   }
   onEcoChange(){
    const keys1:string[]=['economic1','economic4']
    const keys2:string[] = ['economic2','economic3','economic5','economic6']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.economicStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.economicStatus = 3
     }else{
       this.model.economicStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.economicStatus = 1
     }
   }
   onSecurityChange(){
    const keys1:string[]=['security1','security3','security6','security8','security10','security12','security13']
    const keys2:string[] = ['security2','security4','security5','security7','security9','security11','security12']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.securityStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.securityStatus = 3
     }else{
       this.model.securityStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.securityStatus = 1
     }
   }
  
   onSpecialChange(){
    const keys1:string[]=['special1','special3','special5','special7','special9','special11']
    const keys2:string[] = ['special2','special4','special6','special8','special10']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.specialStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.specialStatus = 3
     }else{
       this.model.specialStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.specialStatus = 1
     }
   }
   onElecChange(){
    const keys1:string[]=['electronic1','electronic3']
    const keys2:string[] = ['electronic2','electronic4']
     let isAssign1 = false
     keys1.forEach(el=>{
       if(this.model[el]){
         isAssign1 = true
       }
     })
     if(isAssign1){
       this.model.electronicStatus = 2
     }
     let isAssign2 = false
     keys2.forEach(el=>{
       if(this.model[el]){
         isAssign2 = true
       }
     })
     if(isAssign2){
       this.model.electronicStatus = 3
     }else{
       this.model.electronicStatus = 2
     }
     if(!isAssign2&&!isAssign1){
       this.model.electronicStatus = 1
     }
   }
}
