import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { StudentConsultantItemModel } from '../../student-consultant/student-consultant-model';
import { StudentConsultantService } from '../../student-consultant/student-consultant.service';

@Component({
  selector: 'student-send-to-item',
  templateUrl: './student-send-to-item.component.html',
  styleUrls: ['./student-send-to-item.component.scss']
})
export class StudentSendToItemComponent extends BaseItemComponent<StudentConsultantItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StudentConsultantService, router: Router , route:ActivatedRoute,private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
  }
  studentDropdown:SelectItems[]=[]
  teacherDropdown:SelectItems[]=[]
  consultantTypeDropdown:SelectItems[]=[]
  storyTypeDropdown:SelectItems[]=[]
  resultTypeDropdown:SelectItems[]=[]
  sentTypeDropdown:SelectItems[]=[]
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
    this.consultantTypeDropdown = this.dropdownService.getConsultantTypeDropdown()
    this.storyTypeDropdown = this.dropdownService.getStoryTypeDropdown()
    this.resultTypeDropdown = this.dropdownService.getResultTypeDropdown()
    if(this.userDataService.isGuid()){
      this.sentTypeDropdown = this.dropdownService.getSentTypeGuidDropdown()
    }else{
      this.sentTypeDropdown = this.dropdownService.getSentTypeGuidDropdown()
    }
    
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()

    forkJoin(
    this.service.getStudentDropdown(),
    this.service.getTeacherDropdown(),
    ).subscribe(
      (
      [
      studentDropdown,
      teacherDropdown,
      ]
      ) => {
      [
     this.studentDropdown =studentDropdown  as SelectItems[],
     this.teacherDropdown =teacherDropdown  as SelectItems[],
      ]
      }),
      (error) => {
      }
   
  }
  async setInitialCreatingData(){
    this.service.initial().subscribe(result=>{
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
        this.service.update(this.id,this.model).subscribe(value=>{
          this.backTolist()
        })
      }else{
        this.service.create(this.model).subscribe(value=>{
          this.backTolist()
        })
      }
    }
  }
  backTolist(){    
    this.toList('student-send-to')
  }
}
