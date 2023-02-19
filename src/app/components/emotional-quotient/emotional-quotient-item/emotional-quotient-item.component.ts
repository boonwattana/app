import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { EmotionalQuotientItemModel } from '../emotional-quotient-model';
import { EmotionalQuotientService } from '../emotional-quotient.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'emotional-quotient-item',
  templateUrl: './emotional-quotient-item.component.html',
  styleUrls: ['./emotional-quotient-item.component.scss']
})
export class EmotionalQuotientItemComponent extends BaseItemComponent<EmotionalQuotientItemModel>  implements BaseItemInterface {
  isStudent = false
  complete:boolean = false

  constructor(el:ElementRef,renderer:Renderer2,private readonly service:EmotionalQuotientService, router: Router , route:ActivatedRoute,private readonly messageService:MessageService
    ,private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
    this.isStudent = this.userDataService.getUserType() == 'Student' 
  }
  studentDropdown:SelectItems[]=[]
  yearTermDropdown:SelectItems[]=[]
  formValidate:boolean =true
  sum6 = 0
  sum12 = 0
  sum18 = 0
  sum24 = 0
  sum30 = 0
  sum36 = 0
  sum40 = 0
  sum46 = 0
  sum52 = 0
  onModelChange(e:any){

    setTimeout(() => {
      this.sum6 = this.getSum6()
      this.sum12 = this.getSum12()
      this.sum18 = this.getSum18()
      this.sum24 = this.getSum24()
      this.sum30 = this.getSum30()
      this.sum36 = this.getSum36()
      this.sum40 = this.getSum40()
      this.sum46 = this.getSum46()
      this.sum52 = this.getSum52()
    }, 100);

    
  }
  getSum18(): number {
    return ((this.model.eqCh13?this.model.eqCh13:0)
      +(this.model.eqCh14?this.model.eqCh14:0)
      +(this.model.eqCh15?this.model.eqCh15:0)
      +(this.model.eqCh16?this.model.eqCh16:0)
      +(this.model.eqCh17?this.model.eqCh17:0)
      +(this.model.eqCh18?this.model.eqCh18:0)
      )
  }
  getSum24(): number {
    return ((this.model.eqCh19?this.model.eqCh19:0)
      +(this.model.eqCh20?this.model.eqCh20:0)
      +(this.model.eqCh21?this.model.eqCh21:0)
      +(this.model.eqCh22?this.model.eqCh22:0)
      +(this.model.eqCh23?this.model.eqCh23:0)
      +(this.model.eqCh24?this.model.eqCh24:0)
      )
  }
  getSum30(): number {
    return ((this.model.eqCh25?this.model.eqCh25:0)
      +(this.model.eqCh26?this.model.eqCh26:0)
      +(this.model.eqCh27?this.model.eqCh27:0)
      +(this.model.eqCh28?this.model.eqCh28:0)
      +(this.model.eqCh29?this.model.eqCh29:0)
      +(this.model.eqCh30?this.model.eqCh30:0)
      )
  }
  getSum36(): number {
    return ((this.model.eqCh31?this.model.eqCh31:0)
      +(this.model.eqCh32?this.model.eqCh32:0)
      +(this.model.eqCh33?this.model.eqCh33:0)
      +(this.model.eqCh34?this.model.eqCh34:0)
      +(this.model.eqCh35?this.model.eqCh35:0)
      +(this.model.eqCh36?this.model.eqCh36:0)
      )
  }
  getSum40(): number {
    return ((this.model.eqCh37?this.model.eqCh37:0)
      +(this.model.eqCh38?this.model.eqCh38:0)
      +(this.model.eqCh39?this.model.eqCh39:0)
      +(this.model.eqCh40?this.model.eqCh40:0)
      )
  }
  getSum46(): number {
    return ((this.model.eqCh41?this.model.eqCh41:0)
      +(this.model.eqCh42?this.model.eqCh42:0)
      +(this.model.eqCh43?this.model.eqCh43:0)
      +(this.model.eqCh44?this.model.eqCh44:0)
      +(this.model.eqCh45?this.model.eqCh45:0)
      +(this.model.eqCh46?this.model.eqCh46:0)
      )
  }
  getSum52(): number {
    return ((this.model.eqCh47?this.model.eqCh47:0)
      +(this.model.eqCh48?this.model.eqCh48:0)
      +(this.model.eqCh49?this.model.eqCh49:0)
      +(this.model.eqCh50?this.model.eqCh50:0)
      +(this.model.eqCh51?this.model.eqCh51:0)
      +(this.model.eqCh52?this.model.eqCh52:0)
      )
  }
  getSum6(): number {
    return ((this.model.eqCh1?this.model.eqCh1:0)
      +(this.model.eqCh2?this.model.eqCh2:0)
      +(this.model.eqCh3?this.model.eqCh3:0)
      +(this.model.eqCh4?this.model.eqCh4:0)
      +(this.model.eqCh5?this.model.eqCh5:0)
      +(this.model.eqCh6?this.model.eqCh6:0)
      )
  }
  getSum12(): number {
    return ((this.model.eqCh7?this.model.eqCh7:0)
      +(this.model.eqCh8?this.model.eqCh8:0)
      +(this.model.eqCh9?this.model.eqCh9:0)
      +(this.model.eqCh10?this.model.eqCh10:0)
      +(this.model.eqCh11?this.model.eqCh11:0)
      +(this.model.eqCh12?this.model.eqCh12:0)
      )
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    if(this.isUpdateMode){
      this.getById()
    }else{
      this.setInitialCreatingData()
    }
      this.onAsyncRunner();
  }

  onEnumLoader(): void {
  }
  getById(): void{

    this.service.getItem(this.id).subscribe(result=>{      
      if(result){
        this.model = result
        this.complete = result.isUpdateMode&&this.view

        this.isUpdateMode = result.isUpdateMode
        this.onModelChange(1)
      }     
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
    this.service.initial().subscribe(result=>{
      this.model = result
    })
  }
  onSave(): void {
    this.onSubmit(this.customValidate())
  }
  customValidate(){
    const fieldList = [
      'eqCh1',
      'eqCh2',
      'eqCh3',
      'eqCh4',
      'eqCh5',
      'eqCh6',
      'eqCh7',
      'eqCh8',
      'eqCh9',
      'eqCh10',
      'eqCh11',
      'eqCh12',
      'eqCh13',
      'eqCh14',
      'eqCh15',
      'eqCh16',
      'eqCh17',
      'eqCh18',
      'eqCh19',
      'eqCh20',
      'eqCh21',
      'eqCh22',
      'eqCh23',
      'eqCh24',
      'eqCh25',
      'eqCh26',
      'eqCh27',
      'eqCh28',
      'eqCh29',
      'eqCh30',
      'eqCh31',
      'eqCh32',
      'eqCh33',
      'eqCh34',
      'eqCh35',
      'eqCh36',
      'eqCh37',
      'eqCh38',
      'eqCh39',
      'eqCh40',
      'eqCh41',
      'eqCh42',
      'eqCh43',
      'eqCh44',
      'eqCh45',
      'eqCh46',
      'eqCh47',
      'eqCh48',
      'eqCh49',
      'eqCh50',
      'eqCh51',
      'eqCh52',
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
  } 
  async onSubmit(isValid:boolean){    
    if(isValid){
      if(this.isUpdateMode){
        this.service.update(this.id,this.model).subscribe(value=>{
          const infoId = this.router.url.split('/').reverse()[0]
          this.toItem('emotional-quotient',+infoId,true);
          window.location.reload();
          // if(this.userDataService.isStudent()){
          //   const infoId = this.router.url.split('/').reverse()[0]
          //   this.toItem('emotional-quotient',+infoId,true);
          // }else{
          //   this.toItem('emotional-quotient',+infoId,true);
          // }
        })
      }else{
        this.service.create(this.model).subscribe(value=>{
          const infoId = this.router.url.split('/').reverse()[0]
          this.toItem('emotional-quotient',+infoId,true);
          window.location.reload();
          // if(this.userDataService.isStudent()){
          //   const infoId = this.router.url.split('/').reverse()[0]
          //   this.toItem('emotional-quotient',+infoId,true);
          // }else{
          //   this.backTolist()
          // }
        })
      }
    }
  }
  backTolist(){    
    if(this.userDataService.isStudent()){
      const infoId = this.router.url.split('/').reverse()[0]
      this.toItem('student',+infoId,true);
    }else{
      this.toList('emotional-quotient')
    }
    
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
    this.toItem('emotional-quotient',+infoId,false);
  }
  getAll(){
    const fieldArr = [
      'eqCh1','eqCh2','eqCh3','eqCh4','eqCh5','eqCh6','eqCh7','eqCh8','eqCh9','eqCh10',
      'eqCh11','eqCh12','eqCh13','eqCh14','eqCh15','eqCh16','eqCh17','eqCh18','eqCh19','eqCh20',
      'eqCh21','eqCh22','eqCh23','eqCh24','eqCh25','eqCh26','eqCh27','eqCh28','eqCh29','eqCh30',
      'eqCh31','eqCh32','eqCh33','eqCh34','eqCh35','eqCh36','eqCh37','eqCh38','eqCh39','eqCh40',
      'eqCh41','eqCh42','eqCh43','eqCh44','eqCh45','eqCh46','eqCh47','eqCh48','eqCh49','eqCh50','eqCh51','eqCh52'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,140,170)
  }
  getSumarize(value: number, a: number, b: number) {
    if(value<a){
      return 'ต่ำกว่าปกติ'
    }
    if(value>=a&&value<=b){
      return 'เกณฑ์ปกติ'
    }
    if(value>b){
      return 'สูงกว่าปกติ'
    }
    return ''
  }
  getSumAll(fieldArr: string[]):number {
    let sumValue:number = 0
    fieldArr.forEach(el=>{
      sumValue += +this.model[el]
    })
    return sumValue
  }
  getGood(){
    const fieldArr = [
      'eqCh1','eqCh2','eqCh3','eqCh4','eqCh5','eqCh6','eqCh7','eqCh8','eqCh9','eqCh10',
      'eqCh11','eqCh12','eqCh13','eqCh14','eqCh15','eqCh16','eqCh17','eqCh18'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,48,58)
  }
  getFeelHandle(){
    const fieldArr = [
      'eqCh1','eqCh2','eqCh3','eqCh4','eqCh5','eqCh6'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,13,17)
  }
  getSeeFeeling(){
    const fieldArr = [
      'eqCh7','eqCh8','eqCh9','eqCh10',
      'eqCh11','eqCh12'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,16,20)
  }
  getResponbility(){
    const fieldArr = [
     'eqCh13','eqCh14','eqCh15','eqCh16','eqCh17','eqCh18'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,16,22)
  }
  getGreet(){
    const fieldArr = [
      'eqCh19','eqCh20',
      'eqCh21','eqCh22','eqCh23','eqCh24','eqCh25','eqCh26','eqCh27','eqCh28','eqCh29','eqCh30',
      'eqCh31','eqCh32','eqCh33','eqCh34','eqCh35','eqCh36'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,45,57)
  }
  getMotivation(){
    const fieldArr = [
      'eqCh19','eqCh20',
      'eqCh21','eqCh22','eqCh23','eqCh24'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,14,20)
  }
  getDecide(){
    const fieldArr = [
     'eqCh25','eqCh26','eqCh27','eqCh28','eqCh29','eqCh30'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,13,19)
  }
  getRelationShip(){
    const fieldArr = [
      'eqCh31','eqCh32','eqCh33','eqCh34','eqCh35','eqCh36'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,14,20)
  }
  getHappy(){
    const fieldArr = [
     'eqCh37','eqCh38','eqCh39','eqCh40',
      'eqCh41','eqCh42','eqCh43','eqCh44','eqCh45','eqCh46','eqCh47','eqCh48','eqCh49','eqCh50','eqCh51','eqCh52'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,40,55)
  }
  getSelftPound(){
    const fieldArr = [
      'eqCh37','eqCh38','eqCh39','eqCh40'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,9,13)
  }
  getLifeGood(){
    const fieldArr = [
      'eqCh41','eqCh42','eqCh43','eqCh44','eqCh45','eqCh46'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,16,22)
  }
  getHeartStay(){
    const fieldArr = [
      'eqCh47','eqCh48','eqCh49','eqCh50','eqCh51','eqCh52'
    ]
    const sumAll = this.getSumAll(fieldArr)
    return this.getSumarize(sumAll,15,21)
  }
}
