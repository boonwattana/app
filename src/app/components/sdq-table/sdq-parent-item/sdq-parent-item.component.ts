import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { SdqParentItemModel } from '../sdq-parent-model';
import { SdqParentService } from '../sdq-parent.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'sdq-parent-item',
  templateUrl: './sdq-parent-item.component.html',
  styleUrls: ['./sdq-parent-item.component.scss']
})
export class SdqParentItemComponent extends BaseItemComponent<SdqParentItemModel>  implements BaseItemInterface {
  isStudent = false
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:SdqParentService, router: Router , route:ActivatedRoute,private readonly messageService:MessageService
    ,private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
    this.isStudent = this.userDataService.getUserType() == 'Student' 
  }
  estimateType:number = 3;
  formValidate:boolean =true
  complete:boolean = false
  studentDropdown:SelectItems[]=[]
  yearTermDropdown:SelectItems[]=[]
  ngOnDestroy(): void {
  }
  studentID:number = Number(this.router.url.split('/').reverse()[0]);
  titleDropdown:SelectItems[]=[]
  sdqCurrentTermDataResult:boolean=false;
  ngAfterViewInit(): void {
    this.getSDQCurrentTermData()
   
  }

  onEnumLoader(): void {
    this.titleDropdown = this.dropdownService.getTitleDropdown()
  }
  filterEnum(model:any,array:any){
    let label = array.filter((element:any)=>{
     return element.value === model
   })
   return label[0]?.label
 }
  getById(): void{
    this.complete = true||this.view

    this.service.getItem(this.studentID).subscribe(result=>{      
      this.model = result
      this.model.title=result.title;
      this.model.nameValue =  result.firstname+" "+result.lastname;
      this.model.classroomTypeValue =  result.classroomTypeValue;
      this.model.atSemester = result.atSemester;
      this.model.atYear=result.atYear
      this.model.yearTermId = result.yearTermId
      this.model.studentId = result.studentId
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()
    forkJoin(
      this.service.getStudentDropdown(),
      this.service.getYearTermDropdown(),
      ).subscribe(
        (
        [
        studentDropdown,
        yearTermDropdown,
        ]
        ) => {
        [
       this.studentDropdown =studentDropdown  as SelectItems[],
       this.yearTermDropdown =yearTermDropdown  as SelectItems[],
        ]
        }),
        (error) => {
        }

  }
  async setInitialCreatingData(){
    if(this.view){
      this.complete = false
    }

    this.service.initial(this.studentID).subscribe(result=>{
      this.model = result
      this.model.title=result.title;
      this.model.nameValue =  result.firstname+" "+result.lastname;
      this.model.classroomTypeValue =  result.classroomTypeValue;
      this.model.atSemester = result.atSemester;
      this.model.yearTermId = result.yearTermId
      this.model.studentId = result.studentId
this.model.atYear=result.atYear
    })
  }
  // async getSdqParentCurrenyStorage(){
  //   this.service.getSdqParentCurrenyStorage(this.studentID).subscribe(result=>{
    
  //   })
  // }
  onSave(): void {
    this.onSubmit(this.customValidate())
  }
  customValidate(){
    const fieldList = [
      'choice01'
      ,'choice02'
      ,'choice03'
      ,'choice04'
      ,'choice05'
      ,'choice06'
      ,'choice07'
      ,'choice08'
      ,'choice09'
      ,'choice10'
      ,'choice11'
      ,'choice12'
      ,'choice13'
      ,'choice14'
      ,'choice15'
      ,'choice16'
      ,'choice17'
      ,'choice18'
      ,'choice19'
      ,'choice20'
      ,'choice21'
      ,'choice22'
      ,'choice23'
      ,'choice24'
      ,'choice25'
    ]
    let isValidate:boolean = true
    fieldList.forEach(el=>{
      if(this.model[el] == null||this.model[el] == undefined){
        isValidate = false
      }
    })    
    if(!isValidate){
      this.messageService.add({severity:'error', summary:'ท่านยังกรอกข้อมูลไม่ครบถ้วน', detail:''});
    }
    return isValidate
  }
  ngOnInit(): void {
   this.setInitialCreatingData()
  //  this.getSdqParentCurrenyStorage()
  } 
  async onSubmit(isValid:boolean){    

    if(isValid){
      if(this.isUpdateMode){
        this.model.studentId = this.studentID;
        this.model.estimateType = 3;
        this.service.update(this.model.sdq_id,this.model).subscribe(value=>{
          // if(this.userDataService.isStudent()){
            const infoId = this.router.url.split('/').reverse()[0]
            this.toItem('sdq-parent',+infoId,true);
            window.location.reload();
          // }else{
          //   this.backTolist()
          // }
        })
      }else{
        this.model.studentId = this.studentID;
        this.model.estimateType = this.estimateType; //1 นักเรียนประเมินตนเอง 2. ครูประเมินนักเรียน 3.ผู้ปกครองประเมินนักเรียน
        this.service.create(this.model).subscribe(value=>{
          // if(this.userDataService.isStudent()){
            const infoId = this.router.url.split('/').reverse()[0]
            this.toItem('sdq-parent',+infoId,true);
            
          // }else{
          //   this.backTolist()
          // }
        })
      }
    }
  }
  backTolist(){    
    this.router.navigate(['sdq-parent/'+this.studentID]); 
  }
  async getSDQCurrentTermData(){
    this.service.getSDQCurrentTermData(this.studentID).subscribe(result=>{
      this.sdqCurrentTermDataResult = result;
      this.isUpdateMode = this.sdqCurrentTermDataResult;
      if(this.isUpdateMode){
        this.getById()
      }else{
        this.setInitialCreatingData()
      }
        this.onAsyncRunner();
    })
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
    this.toItem('sdq-parent',+infoId,false);
  }
  getAll(){
    const fieldList = [
    'choice01'
    ,'choice02'
    ,'choice03'
    ,'choice04'
    ,'choice05'
    ,'choice06'
    ,'choice07'
    ,'choice08'
    ,'choice09'
    ,'choice10'
    ,'choice11'
    ,'choice12'
    ,'choice13'
    ,'choice14'
    ,'choice15'
    ,'choice16'
    ,'choice17'
    ,'choice18'
    ,'choice19'
    ,'choice20'
    ,'choice21'
    ,'choice22'
    ,'choice23'
    ,'choice24'
    ,'choice25'
  ]
  const sumData = this.getDataSum(fieldList)
    if(sumData<=15){
      return 'ปกติ'
    }
    if(sumData=>16&&sumData<=18){
      return 'เสี่ยง'
    }
    if(sumData=>19&&sumData<=40){
      return 'มีปัญหา'
    }
    return ''
  }
  getDataSum(fieldList: string[]) {
    let sum:number = 0
    fieldList.forEach(el=>{
      sum+= +this.model[el]
    })
    return sum
  }
  getSocial(){
    const fieldList = [
      'choice01'
      ,'choice04'
      ,'choice09'
      ,'choice17'
      ,'choice20'
    ]
    const sumData = this.getDataSum(fieldList)
    if(sumData<=4){
      return 'ไม่มีจุดแข็ง'
    }
    if(sumData=>5&&sumData<=10){
      return 'เป็นจุดแข็ง'
    }

    return ''
  }
  getRelationship(){
    const fieldList = [
      ,'choice06'
      ,'choice11'
      ,'choice14'
      ,'choice19' 
      ,'choice23'
    ]
    const sumData = this.getDataSum(fieldList)
    if(sumData<=4){
      return 'ปกติ'
    }
    if(sumData=>5&&sumData<=5){
      return 'เสี่ยง'
    }
    if(sumData=>6&&sumData<=10){
      return 'มีปัญหา'
    }
    return ''
  }
  getShotThink(){
    const fieldList = [
      'choice02'
      ,'choice10'
      ,'choice15'
      ,'choice21'
      ,'choice25'
    ]
    const sumData = this.getDataSum(fieldList)
    if(sumData<=5){
      return 'ปกติ'
    }
    if(sumData=>6&&sumData<=6){
      return 'เสี่ยง'
    }
    if(sumData=>7&&sumData<=10){
      return 'มีปัญหา'
    }
    return ''
  }
  getBehavior(){
    const fieldList = [
      ,'choice05'
      ,'choice07'
      ,'choice12'
      ,'choice18'
      ,'choice22'
    ]
    const sumData = this.getDataSum(fieldList)
    if(sumData<=4){
      return 'ปกติ'
    }
    if(sumData=>5&&sumData<=5){
      return 'เสี่ยง'
    }
    if(sumData=>6&&sumData<=10){
      return 'มีปัญหา'
    }
    return ''
  }
  getFeel(){
    const fieldList = [
      'choice03'
      ,'choice08'
      ,'choice13'
      ,'choice16'
      ,'choice24'
    ]
    const sumData = this.getDataSum(fieldList)
      if(sumData<=4){
        return 'ปกติ'
      }
      if(sumData=>5&&sumData<=5){
        return 'เสี่ยง'
      }
      if(sumData=>6&&sumData<=10){
        return 'มีปัญหา'
      }
      return ''
  }
}
