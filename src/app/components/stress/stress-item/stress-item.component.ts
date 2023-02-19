import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { StressItemModel } from '../stress-model';
import { StressService } from '../stress.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'stress-item',
  templateUrl: './stress-item.component.html',
  styleUrls: ['./stress-item.component.scss']
})
export class StressItemComponent extends BaseItemComponent<StressItemModel>  implements BaseItemInterface {
  isStudent = false
  complete:boolean = false

  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StressService, router: Router , route:ActivatedRoute,
    private readonly userDataService:UserDataService,private readonly messageService:MessageService
    ){
    super(el,renderer,router,route) 
    this.isStudent = this.userDataService.getUserType() == 'Student' 

  }
  studentDropdown:SelectItems[]=[]
  yearTermDropdown:SelectItems[]=[]
  formValidate:boolean =true
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
      'stressCh1',
      'stressCh2',
      'stressCh3',
      'stressCh4',
      'stressCh5',
      'stressCh6',
      'stressCh7',
      'stressCh8',
      'stressCh9',
      'stressCh10',
      'stressCh11',
      'stressCh12',
      'stressCh13',
      'stressCh14',
      'stressCh15',
      'stressCh16',
      'stressCh17',
      'stressCh18',
      'stressCh19',
      'stressCh20'
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
          // if(this.userDataService.isStudent()){
            const infoId = this.router.url.split('/').reverse()[0]
            this.toItem('stress',+infoId,true);
            window.location.reload();
          // }else{
          //   this.backTolist()
          // }
          
        })
      }else{
        this.service.create(this.model).subscribe(value=>{
          // if(this.userDataService.isStudent()){
            const infoId = this.router.url.split('/').reverse()[0]
            this.toItem('stress',+infoId,true);
            window.location.reload();
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
      this.toList('stress')
    }  
    
  }
  pageEdit(){
    // localStorage
    const infoId = this.router.url.split('/').reverse()[0]
   
        this.toItem('stress',+infoId,false);
    
    
  }
  getStressLabel(){
    const fieldArr:string[] = [
      'stressCh1',
      'stressCh2',
      'stressCh3',
      'stressCh4',
      'stressCh5',
      'stressCh6',
      'stressCh7',
      'stressCh8',
      'stressCh9',
      'stressCh10',
      'stressCh11',
      'stressCh12',
      'stressCh13',
      'stressCh14',
      'stressCh15',
      'stressCh16',
      'stressCh17',
      'stressCh18',
      'stressCh19',
      'stressCh20'
    ]
    let sumValue:number = 0
    fieldArr.forEach(el=>{
      sumValue += + this.model[el]
    })
    if(sumValue<=23){
      return 'มีระดับความเครียดน้อย'
    }
    if(sumValue>=24&&sumValue<=41){
      return 'มีระดับความเครียดปานกลาง'
    }
    if(sumValue>=42&&sumValue<=61){
      return 'มีความเครียดในระดับสูง'
    }
    if(sumValue>=62){
      return 'มีระดับความเครียดรุนแรง'
    }
    return ''
  }
}
