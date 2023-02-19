import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { TeachingScheduleItemModel } from '../teaching-schedule-model';
import { TeachingScheduleService } from '../teaching-schedule.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'teaching-schedule-item',
  templateUrl: './teaching-schedule-item.component.html',
  styleUrls: ['./teaching-schedule-item.component.scss']
})
export class TeachingScheduleItemComponent extends BaseItemComponent<TeachingScheduleItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:TeachingScheduleService, private userDataService:UserDataService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  teacherDropdown:SelectItems[]=[]
  yearTermDropdown:SelectItems[]=[]
  formValidate:boolean =true
  teacherID:number = Number(this.router.url.split('/').reverse()[0]);
  titleDropdown:SelectItems[]=[]
  onBackViewDisplay=!this.userDataService.isTeacher();
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    this.getPageMode()
      this.onAsyncRunner();
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
    this.toItem('teaching-schedule',+infoId,false);
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
    this.service.getItemByTeacherId(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()
  if(!this.view){
    forkJoin(
    ).subscribe(
      (
      [
      ]
      ) => {
      [
      ]
      }),
      (error) => {
      }
   }
  }
  async setInitialCreatingData(){
    this.service.initialByTeacherId(this.teacherID).subscribe(result=>{
      this.model=result;
    
    })
  }
  onSave(): void {
    this.onSubmit(this.validateField())
  }
  ngOnInit(): void {
   this.setInitialCreatingData()
  } 
  async onSubmit(isValid:boolean){   
    if(isValid){
      if(this.isUpdateMode){
       this.service.update(this.model.id,this.model).subscribe(value=>{
        this.displayService.setViewMode()
        this.router.navigate(['teaching-schedule'+'/'+this.teacherID]);
        })
      }else{
         this.service.create(this.model).subscribe(value=>{
          this.displayService.setViewMode()
          this.router.navigate(['teaching-schedule'+'/'+this.teacherID]);
        })
      }
    }
  }
  backTolist(){   
     
    this.toList('teaching-schedule')
  }
  onBackView(){
    if(this.isUpdateMode===true){
      this.displayService.setViewMode()
    }else{
      this.displayService.setCreateMode()
    }
if(this.userDataService.isTeacher()==true){
  this.router.navigate(['teaching-schedule'+'/'+this.teacherID]);
}else{this.toList('teaching-schedule')}
   
  }
  async getPageMode(){
    this.service.getTeachingPageModeByteacherID(this.teacherID).subscribe(result=>{
      
      this.isUpdateMode = result;
      if(this.isUpdateMode){
        // this.displayService.setViewMode()
        this.getById()
      }else{
        // this.displayService.setCreateMode()
        this.setInitialCreatingData()
      }
        this.onAsyncRunner();
    })
  }
}
