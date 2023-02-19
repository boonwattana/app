import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { SarPresonalDataItemModel } from '../sar-presonal-data-model';
import { SarPresonalDataService } from '../sar-presonal-data.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-presonal-data-item',
  templateUrl: './sar-presonal-data-item.component.html',
  styleUrls: ['./sar-presonal-data-item.component.scss']
})
export class SarPresonalDataItemComponent extends BaseItemComponent<SarPresonalDataItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:SarPresonalDataService,private userDataService:UserDataService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
    
  }
  teacherDropdown:SelectItems[]=[]
  subjectGroupDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher = this.userDataService.isTeacher()
  infoIdValue:string =this.userDataService.getInfoId();
  educationObj=[];
  educationDropdown :SelectItems[]=[]
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
    this.educationDropdown = this.dropdownService.getEducationDropdown()
  }
  filterEnum(model:any,array:any){
    let label = array.filter((element:any)=>{
     return element.value === model
   })
   return label[0]?.label
 }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()
  if(!this.view){
    forkJoin(
    this.service.getTeacherDropdown(),

    ).subscribe(
      (
      [
      teacherDropdown,
      ]
      ) => {
      [
     this.teacherDropdown =teacherDropdown  as SelectItems[],
      ]
      }),
      (error) => {
      }
   }
  }
  async setInitialCreatingData(){
    this.service.initialByTeacherId(this.userDataService.getInfoId()).subscribe(result=>{
    
      this.educationObj=result.education;
      this.model = result
    
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
 
          this.model.refId= this.model.schoolYear+'-'+ this.model.teacherId;
       
        this.service.update(this.id,this.model).subscribe(value=>{
          this.backTolist()
        })
      }else{

          this.model.refId= this.model.schoolYear+'-'+ this.model.teacherId;
    
        this.service.create(this.model).subscribe(value=>{
          this.backTolist()
        })
      }
    }
  }
  backTolist(){    
    this.toList('sar-presonal-data')
  }
  

}
